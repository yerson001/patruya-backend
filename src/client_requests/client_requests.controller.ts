import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientRequestsService } from './client_requests.service';
import { CreateClientRequestDto } from './dto/create.client_requests.dto';

@Controller('client-requests')
export class ClientRequestsController {

    constructor(
        private clientRequestsService: ClientRequestsService
    ) {

    }


    @Get(':origin_lat/:origin_lng/:destination_lat/:destination_lng')
    async getTimeAndDistanceClientRequest(
        @Param('origin_lat') origin_lat: number,
        @Param('origin_lng') origin_lng: number,
        @Param('destination_lat') destination_lat: number,
        @Param('destination_lng') destination_lng: number) {
        return this.clientRequestsService.getTimeAndDistanceClientRequest(origin_lat, origin_lng, destination_lat, destination_lng);
    }

    @Post()
    create(@Body() clientRequest: CreateClientRequestDto) {
        return this.clientRequestsService.create(clientRequest);
    }

    @Get(':officer_lat/:officer_lng')
    getNearbyTripRequest(
        @Param('officer_lat') officer_lat: number,
        @Param('officer_lng') officer_lng: number) {
        return this.clientRequestsService.getNearbyTripRequest(officer_lat, officer_lng);
    }

}
