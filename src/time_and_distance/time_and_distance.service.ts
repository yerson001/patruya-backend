import { Injectable } from '@nestjs/common';
import { TimeAndDistanceValue } from './time_and_distance_value.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeAndDistanceService {
    constructor(
        @InjectRepository(TimeAndDistanceValue)
        private timeAndDistanceRepository: Repository<TimeAndDistanceValue>,
    ){

    }


    find(){
        return this.timeAndDistanceRepository.find({
            where: {
                id: 1
            }
        });
    }
}
