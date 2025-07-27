import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')// http://localhost:300/auth/register
    register(@Body() registerData: RegisterAuthDto)
    {
        return this.authService.register(registerData);
    }

    @Post('login')// http://localhost:300/auth/login
    login(@Body() loginData: LoginAuthDto)
    {
        return this.authService.login(loginData);
    }
}
