import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en todos los módulos
      envFilePath: '.env', // Carga las variables desde el archivo .env
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
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
