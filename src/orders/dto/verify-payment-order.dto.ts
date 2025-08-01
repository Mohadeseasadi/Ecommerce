import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyPaymentOrderDTO {
  @IsNumber()
  @IsNotEmpty()
  trackId: number;

  @IsNumber()
  @IsNotEmpty()
  orderId: number;
}
