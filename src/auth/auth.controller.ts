import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { APiResponse } from 'src/utils/api-response';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService 
    ){}


    @Post('register')
    async register( @Body() registerDto:RegisterDto ){
        const user = await this.authService.register(registerDto);

        return new APiResponse(true,'Register user successfully' , user);
    }

    @Post('login')
    async login( @Body() loginDto:LoginDto ){
        const token = await this.authService.login(loginDto);

        return new APiResponse(true,'Login user successfully' , token);
    }
}
