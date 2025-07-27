import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';
import { CreateOrderItemDto } from './create-oder-items.dto';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsDateString()
  @IsOptional()
  payed_time?: string;

  @IsInt()
  addressId: number;

  @IsNumber()
  total_price: number;

  @IsString()
  @IsOptional()
  diccount_code?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
