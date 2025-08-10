import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'orange juice' })
  @IsString()
  title: string;

  @ApiProperty({ example: 120000 })
  @IsInt()
  price: number;

  @ApiPropertyOptional({ example: 'orange+suger' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  stock: number;

  @ApiPropertyOptional({ type: Number, isArray: true, example: '[1]' })
  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}
