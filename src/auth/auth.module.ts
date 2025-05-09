import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService] , 
  imports: [
    UsersModule ,     
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1h' }}),
  ]
})
export class AuthModule {}
