import { Body, Controller, Delete, Get, Param, ParseFloatPipe, ParseIntPipe, Post } from '@nestjs/common';
import { OfficerPosition } from './officer_position.entity';
import { OfficerPositionService } from './officer_position.service';
import { createOfficerPosition } from './dto/create_officer_position.dto';

@Controller('officer-position')
export class OfficerPositionController {
    constructor(private officerPositionService: OfficerPositionService) { }

    @Post()
    create(@Body() officerPosition: createOfficerPosition) {
        return this.officerPositionService.createOfficerPosition(officerPosition);
    }

    @Get(':citizen_lat/:citizen_lng')
    getNearbyOfficer(
        @Param('citizen_lat', ParseFloatPipe) citizen_lat: number,
        @Param('citizen_lng', ParseFloatPipe) citizen_lng: number
    ) {
        return this.officerPositionService.getNearbyOfficers(citizen_lat, citizen_lng);
    }

    @Delete(':id_officer')
    delete(@Param('id_officer', ParseIntPipe) id_officer: number) {
        return this.officerPositionService.delete(id_officer);
    }

    @Get(':id_officer')
    getOfficerPosition(
        @Param('id_officer', ParseFloatPipe) id_position: number,
    ) {
        return this.officerPositionService.getOfficerPosition(id_position);
    }

}
