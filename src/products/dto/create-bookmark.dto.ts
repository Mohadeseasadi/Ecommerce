import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookmarkProductDTO {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
