import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { User } from 'src/users/entities/user.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'address', method: RequestMethod.POST },
        { path: 'address/:id', method: RequestMethod.GET },
      );
  }
}
