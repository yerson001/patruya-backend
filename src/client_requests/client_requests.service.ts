import { Client, DistanceMatrixResponseData, Time, TravelMode } from '@googlemaps/google-maps-services-js';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeAndDistanceService } from 'src/time_and_distance/time_and_distance.service';
import { ClientRequests } from './cliente_requests.entity';
import { Repository } from 'typeorm';
import { CreateClientRequestDto } from './dto/create.client_requests.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientRequestsService {
  private client: Client;
  private googleApiKey: string;

  constructor(
    @InjectRepository(ClientRequests)
    private clientRequestsRepository: Repository<ClientRequests>,
    private timeAndDistanceService: TimeAndDistanceService,
    private readonly configService: ConfigService, // ✅ Inyectamos ConfigService
  ) {
    this.client = new Client({});
    this.googleApiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY'); // ✅ Cargamos la API Key desde .env
  }
    async create(clientRequest: CreateClientRequestDto) {
        try {
            await this.clientRequestsRepository.query(
                `INSERT INTO client_requests (
                id_client,
                incident_type,
                pickup_description,
                destination_description,
                pickup_position,
                destination_position
            ) VALUES (
                $1, $2, $3, $4,
                ST_SetSRID(ST_MakePoint($5, $6), 4326),
                ST_SetSRID(ST_MakePoint($7, $8), 4326)
            )`,
                [
                    clientRequest.id_client,
                    clientRequest.incident_type,
                    clientRequest.pickup_description,
                    clientRequest.destination_description,
                    clientRequest.pickup_lng,       // LONGITUD origen
                    clientRequest.pickup_lat,       // LATITUD origen
                    clientRequest.destination_lng,  // LONGITUD destino
                    clientRequest.destination_lat   // LATITUD destino
                ]
            );
            const data = await this.clientRequestsRepository.query(`SELECT MAX(id) AS id FROM client_requests`);
            console.log("ID CLIENT REQUEST: ", data[0].id);
            


            return Number(data[0].id);
        } catch (e) {
            console.log("Error creando la solicitud del cliente", e);
            return false;
        }
    }

    async getNearbyTripRequest(officer_lat: number, officer_lng: number) {
        const data = await this.clientRequestsRepository.query(`
                SELECT
                CR.id,
                CR.id_client,
                CR.incident_type,
                CR.pickup_description,
                CR.destination_description,
                CR.status,
                CR.updated_at,
                jsonb_build_object(
                    'x', ST_X(CR.pickup_position),
                    'y', ST_Y(CR.pickup_position)
                ) AS pickup_position,
                jsonb_build_object(
                    'x', ST_X(CR.destination_position),
                    'y', ST_Y(CR.destination_position)
                ) AS destination_position,
                ST_Distance(
                    CR.pickup_position::geography,
                    ST_MakePoint(${officer_lng}, ${officer_lat})::geography
                ) AS distance,
                EXTRACT(EPOCH FROM (NOW() - CR.updated_at)) / 60 AS time_difference,
                jsonb_build_object(
                    'name', U.name,
                    'lastname', U.lastname,
                    'phone', U.phone,
                    'image', U.image
                ) AS client
                FROM client_requests AS CR
                INNER JOIN users AS U ON U.id = CR.id_client
                WHERE 
                EXTRACT(EPOCH FROM (NOW() - CR.updated_at)) / 60 < 10000
                AND ST_Distance(
                    CR.pickup_position::geography,
                    ST_MakePoint(${officer_lng}, ${officer_lat})::geography
                ) < 1000000
            `);

        if (!data.length) return [];

        // Paso 1: convertir posiciones de recogida en formato lat,lng para Google
        const pickup_positions = data.map(d => `${d.pickup_position.y},${d.pickup_position.x}`);

        // Paso 2: llamar a la API Distance Matrix
        const googleResponse = await this.client.distancematrix({
            params: {
                key: this.googleApiKey,
                mode: TravelMode.driving,
                origins: [`${officer_lat},${officer_lng}`],
                destinations: pickup_positions
            }
        });

        const elements = googleResponse.data.rows[0].elements;

        // Paso 3: unir resultados
        const enrichedData = data.map((item, index) => ({
            ...item,
            google_distance_matrix: elements[index]
        }));

        return enrichedData;
    }




    async getTimeAndDistanceClientRequest(
        origin_lat: number,
        origin_lng: number,
        destination_lat: number,
        destination_lng: number,
    ) {
        const value = await this.timeAndDistanceService.find();
        const kmValue = value[0].km_value;
        const minValue = value[0].min_value;

        console.log("  - - - VALORES - - -");
        console.log(value);

        const response = await this.client.distancematrix({


            params: {
                mode: TravelMode.driving,
                key: this.googleApiKey,
                origins: [`${origin_lat},${origin_lng}`],
                destinations: [`${destination_lat},${destination_lng}`],
            },
        });

        const recomendedValue = (kmValue * response.data.rows[0].elements[0].distance.value / 1000) + (minValue * response.data.rows[0].elements[0].duration.value / 60);
        console.log(recomendedValue);

        return {
            'recomended_value': recomendedValue,
            'destination_addresses': response.data.destination_addresses,
            'origin_addresses': response.data.origin_addresses,
            'distance': {
                'text': response.data.rows[0].elements[0].distance.text,
                'value': response.data.rows[0].elements[0].distance.value / 1000,
            },
            'duration': {
                'text': response.data.rows[0].elements[0].duration.text,
                'value': response.data.rows[0].elements[0].duration.value / 60,
            },
        };
    }
}
