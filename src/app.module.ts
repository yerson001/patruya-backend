import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { SocketModule } from './socket/socket.module';
import { OfficerPositionModule } from './officer_position/officer_position.module';
import { ClientRequestsModule } from './client_requests/client_requests.module';
import { TimeAndDistanceModule } from './time_and_distance/time_and_distance.module';
import { OfficerTripResponseModule } from './officer_trip_response/officer_trip_response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port: 5433,
      username:'root',
      password: 'char5524',
      database: 'my_db',
      autoLoadEntities: true,
      //entities:[__dirname + '/**/*.entity{.ts,.js}']
      synchronize:true
    }),

    UsersModule,
    AuthModule,
    RolesModule,
    SocketModule,
    OfficerPositionModule,
    ClientRequestsModule,
    TimeAndDistanceModule,
    OfficerTripResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
