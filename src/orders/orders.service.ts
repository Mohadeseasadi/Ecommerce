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
    // get user and adddress
    const [user, address] = await Promise.all([
      this.userService.findOne(createOrderDto.userId),
      this.addressService.findOne(createOrderDto.addressId),
    ]);

    // create order
    const order = await this.orderRepo.save(
      this.orderRepo.create({
        user,
        address,
        diccount_code: createOrderDto.diccount_code,
        status: createOrderDto.status,
      }),
    );

    let totalPrice = 0;
    const orderItemsToSave: OrderItem[] = [];

    for (const item of createOrderDto.items ?? []) {
      const product = await this.productService.findOne(item.productId);
      totalPrice += product.price * item.quantity;

      orderItemsToSave.push(
        this.orderItemRepo.create({
          order,
          product,
          quantity: item.quantity,
        }),
      );
    }

    if (orderItemsToSave.length) {
      await this.orderItemRepo.save(orderItemsToSave);
    }

    await this.orderRepo.update(order.id, { total_price: totalPrice });

    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items', 'items.product'],
    }) as Promise<Order>;
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
