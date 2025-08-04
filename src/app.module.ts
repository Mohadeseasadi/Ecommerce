import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './config/database.module';
import { IpTrackerMiddleware } from './ip-tracker/ip-tracker.middleware';
import { IpTrackerModule } from './ip-tracker/ip-tracker.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AddressModule,
    TicketsModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    IpTrackerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpTrackerMiddleware).forRoutes('*');
  }
}
