import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressModule,
    TicketsModule,
    ProductsModule ,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
