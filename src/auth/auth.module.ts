import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/jwt.constants';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { Rol } from 'src/roles/rol.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Rol]),    
    JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '365d' },
        }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
