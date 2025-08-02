import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficerPosition } from './officer_position.entity';
import { User } from 'src/users/user.entity';
import { createOfficerPosition } from './dto/create_officer_position.dto';

@Injectable()
export class OfficerPositionService {
    constructor(
        @InjectRepository(OfficerPosition) private officerPositionRepository: Repository<OfficerPosition>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {

    }
    async createOfficerPosition(officerPosition: createOfficerPosition) {
        try {
            // Verifica si ya existe una posición para ese oficial
            const existing = await this.officerPositionRepository.query(
                `SELECT * FROM officer_position WHERE id_officer = $1`,
                [officerPosition.id_officer]
            );

            if (existing.length === 0) {
                // INSERT si no existe
                await this.officerPositionRepository.query(
                    `INSERT INTO officer_position (id_officer, position)
         VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))`,
                    [
                        officerPosition.id_officer,
                        officerPosition.lng,
                        officerPosition.lat
                    ]
                );
            } else {
                // UPDATE si ya existe
                await this.officerPositionRepository.query(
                    `UPDATE officer_position
         SET position = ST_SetSRID(ST_MakePoint($2, $3), 4326)
         WHERE id_officer = $1`,
                    [
                        officerPosition.id_officer,
                        officerPosition.lng,
                        officerPosition.lat
                    ]
                );
            }

            return true;
        } catch (error) {
            console.error('Error in createOfficerPosition:', error);
            return false;
        }
    }

    async getOfficerPosition(id_officer: number) {
        const result = await this.officerPositionRepository.query(
            `
            SELECT 
            id_officer, 
            ST_X(position::geometry) AS lat, 
            ST_Y(position::geometry) AS lng
            FROM officer_position
            WHERE id_officer = $1
            LIMIT 1
            `,
                    [id_officer]
        );

        return result[0] || null;
    }



    async getNearbyOfficers(citizen_lat: number, citizen_lng: number) {
        const officers = await this.officerPositionRepository.query(`
        SELECT
            id_officer,
            json_build_object(
                'x', ST_X(position::geometry),
                'y', ST_Y(position::geometry)
            ) AS position,
            ST_Distance(position::geography, ST_MakePoint($2, $1)::geography) AS distance
        FROM
            officer_position
        WHERE
            ST_Distance(position::geography, ST_MakePoint($2, $1)::geography) <= 5000
        ORDER BY distance ASC
    `, [citizen_lat, citizen_lng]);

        return officers;
    }

    delete(id_driver: number) {
        return this.officerPositionRepository.delete(id_driver);
    }


}
