import { Injectable, NotFoundException } from '@nestjs/common';
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
        const orderItem = this.orderItemRepo.create({
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

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['user', 'address', 'items', 'items.product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'address', 'items', 'items.product'],
    });

    if (!order) throw new NotFoundException('Order not found ');

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.userId) {
      const user = await this.userService.findOne(updateOrderDto.userId);
      order.user = user;
    }

    if (updateOrderDto.addressId) {
      const address = await this.addressService.findOne(
        updateOrderDto.addressId,
      );
      order.address = address;
    }

    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }

    if (updateOrderDto.payed_time) {
      order.payed_time = new Date(updateOrderDto.payed_time);
    }

    if (updateOrderDto.total_price !== undefined) {
      order.total_price = updateOrderDto.total_price;
    }

    if (updateOrderDto.diccount_code !== undefined) {
      order.diccount_code = updateOrderDto.diccount_code;
    }

    return this.orderRepo.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);

    if (order.items && order.items.length > 0) {
      await this.orderItemRepo.remove(order.items);
    }
    await this.orderRepo.remove(order);
  }
}
