import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressModule ,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
