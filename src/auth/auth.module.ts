import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';


@Module({
  providers: [AuthService , JwtStrategy] , 
  imports: [
    PassportModule ,
    UsersModule ,     
    JwtModule.registerAsync({ 
      imports:[ConfigModule] , 
      inject: [ConfigService] ,
      useFactory: async( configService: ConfigService ): Promise<{}> => ({
        secret: configService.get('JWT_SECRET') ,
        signOption: { expireIn: configService.get('JWT_EXPIRATION') }
      })
    }),
  ], controllers: [AuthController]
})
export class AuthModule {}
