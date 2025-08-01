import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsInt()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  stock: number;

  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}
