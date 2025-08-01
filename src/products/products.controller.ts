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
import { BasketDTO } from './dto/basket.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return new APiResponse(true, 'Create product successfully', product);
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return new APiResponse(true, 'Fetch products successfully', products);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    return new APiResponse(true, 'Fetch product successfully', product);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(+id, updateProductDto);
    return new APiResponse(true, 'Update product successfully', product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post('add-baskets')
  async addItemToBasket(@Body() basketDto: BasketDTO) {
    const result = await this.productsService.addItemToBasket(
      basketDto.user_id,
      basketDto.product_id,
    );
    return new APiResponse(true, 'Add product to basket successfully', result);
  }

  @Post('remove-baskets')
  async removeItemFromBasket(@Body() basketDto: BasketDTO) {
    await this.productsService.removeItemFromBasket(
      basketDto.user_id,
      basketDto.product_id,
    );
    return new APiResponse(
      true,
      'Remove product from basket successfully',
      null,
    );
  }
}
