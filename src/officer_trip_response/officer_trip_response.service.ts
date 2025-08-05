import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficerTripResponse } from './officer_trip_response.entity';
import { Repository } from 'typeorm';
import { CreateOfficerTripResponseDto } from './dto/create_officer_trip_response.dto';

@Injectable()
export class OfficerTripResponseService {

    constructor(
        @InjectRepository(OfficerTripResponse)
        private officerTripResponseRepository: Repository<OfficerTripResponse>,
    ) {

    }

    create(officerTripResponse: CreateOfficerTripResponseDto){
        const newData = this.officerTripResponseRepository.create(officerTripResponse);

        return this.officerTripResponseRepository.save(newData);
    }

    findByOfficerRequest(id_officer_request: number){
        return this.officerTripResponseRepository.find({
           relations: ['officer'],where:{
            id_client_request: id_officer_request
           }
        });
    }
}
