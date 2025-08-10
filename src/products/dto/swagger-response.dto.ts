import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/utils/dto/api-response.dto';
import { Product } from '../entities/product.entity';

export class ProductResponseDto extends ApiResponseDto<Product> {
  @ApiProperty({ type: Product })
  declare data: Product;
}

export class ProductsListResponseDto extends ApiResponseDto<Product[]> {
  @ApiProperty({ type: [Product] })
  declare data: Product[];
}
