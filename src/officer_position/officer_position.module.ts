import { Module } from '@nestjs/common';
import { OfficerPositionService } from './officer_position.service';
import { OfficerPositionController } from './officer_position.controller';
import { Type } from 'class-transformer';
import { OfficerPosition } from './officer_position.entity';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OfficerPosition,User])],
  providers: [OfficerPositionService],
  controllers: [OfficerPositionController]
})
export class OfficerPositionModule {}
