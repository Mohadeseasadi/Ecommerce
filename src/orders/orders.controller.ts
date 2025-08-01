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
import { PaymentOrderDTO } from './dto/payment-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { VerifyPaymentOrderDTO } from './dto/verify-payment-order.dto';
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

  @Post('/start-payment')
  async startPayment(@Body() paymentOrderDto: PaymentOrderDTO) {
    const result = await this.ordersService.startPayment(
      paymentOrderDto.orderId,
    );

    return new APiResponse(true, `Payment started!`, result);
  }

  @Post('/verify-payment')
  async verifyPayment(@Body() verifyPaymentOrderDto: VerifyPaymentOrderDTO) {
    const result = await this.ordersService.verifyPayment(
      verifyPaymentOrderDto.trackId,
      verifyPaymentOrderDto.orderId,
    );
    return new APiResponse(true, `Payment started!`, result);
  }
}
