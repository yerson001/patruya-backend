import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OfficerTripResponseService } from './officer_trip_response.service';
import { CreateOfficerTripResponseDto } from './dto/create_officer_trip_response.dto';

@Controller('officer-trip-response')
export class OfficerTripResponseController {
    constructor(private readonly officerTripResponseService: OfficerTripResponseService) { }

    @Get('findByClientRequest/:id_client_request')
    findByOfficerRequest(@Param('id_client_request') id_client_request: number) {
        return this.officerTripResponseService.findByOfficerRequest(id_client_request);
    }

    @Post()
    create(@Body() officerTripResponse: CreateOfficerTripResponseDto) {
        return this.officerTripResponseService.create(officerTripResponse);
    }


}
