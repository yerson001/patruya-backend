import { Module } from '@nestjs/common';
import { ClientRequestsService } from './client_requests.service';
import { ClientRequestsController } from './client_requests.controller';
import { TimeAndDistanceModule } from 'src/time_and_distance/time_and_distance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRequests } from './cliente_requests.entity';
import { use } from 'passport';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TimeAndDistanceModule,TypeOrmModule.forFeature([ClientRequests,User])],
  controllers: [ClientRequestsController],
  providers: [ClientRequestsService],  
})
export class ClientRequestsModule {}
