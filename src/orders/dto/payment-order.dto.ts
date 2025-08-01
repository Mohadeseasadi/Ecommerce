import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentOrderDTO {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;
}
