import { Module } from '@nestjs/common';
import { TimeAndDistanceService } from './time_and_distance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeAndDistanceValue } from './time_and_distance_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeAndDistanceValue])],
  providers: [TimeAndDistanceService],
  exports: [TimeAndDistanceService],
})
export class TimeAndDistanceModule {}
