import { Module } from '@nestjs/common';
import { OfficerTripResponseController } from './officer_trip_response.controller';
import { OfficerTripResponseService } from './officer_trip_response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficerTripResponse } from './officer_trip_response.entity';
import { ClientRequests } from 'src/client_requests/cliente_requests.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficerTripResponse,User,ClientRequests])],
  controllers: [OfficerTripResponseController],
  providers: [OfficerTripResponseService]
})
export class OfficerTripResponseModule {}
