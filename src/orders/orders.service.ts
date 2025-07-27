import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-items.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    // ------- services -------
    private readonly userService: UsersService,
    private readonly addressService: AddressService,
    private readonly productService: ProductsService,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findOne(createOrderDto.userId);
    const address = await this.addressService.findOne(createOrderDto.addressId);

    const order = this.orderRepo.create({
      user,
      address,
      total_price: createOrderDto.total_price,
      diccount_code: createOrderDto.diccount_code,
      status: createOrderDto.status,
    });

    const savedOrder = await this.orderRepo.save(order);

    if (createOrderDto.items && createOrderDto.items.length > 0) {
      const orderItems = createOrderDto.items.map(async (item) => {
        const product = await this.productService.findOne(item.productId);
        const orderItem = await this.orderItemRepo.create({
          order: savedOrder,
          product,
          quantity: item.quantity,
        });

        return this.orderItemRepo.save(orderItem);
      });
      await Promise.all(orderItems);
    }
    return savedOrder;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
