import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { APiResponse } from 'src/utils/api-response';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return new APiResponse(true, 'Order created successfully !', order);
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return new APiResponse(true, 'Orders fetched successfully!', orders);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);
    return new APiResponse(true, 'Order fetched successfully!', order);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const updatedOrder = await this.ordersService.update(+id, updateOrderDto);
    return new APiResponse(true, 'Order updated successfully!', updatedOrder);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
    return new APiResponse(true, `Order with id ${id} deleted successfully!`);
  }

  @Post('/start-payment/:id')
  async startPayment(@Param('id') id: string) {
    const result = await this.ordersService.startPayment(+id);
    return new APiResponse(true, `Payment started!`, {
      paymentUrl: 'https://gateway.zibal.ir/start/' + result.trackId,
    });
  }

  @Post('/verify-payment/:id')
  async verifyPayment(@Param('id') id: string) {
    const result = await this.ordersService.verifyPayment(+id);
    return new APiResponse(true, `Payment started!`, result);
  }
}
