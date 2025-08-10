import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { APiResponse } from 'src/utils/api-response';
import { BasketDTO } from './dto/basket.dto';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ProductResponseDto,
  ProductsListResponseDto,
} from './dto/swagger-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductsService } from './products.service';

@ApiTags('Products Management')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    status: 201,
    description: 'Created product response',
    type: ProductResponseDto,
  })
  @ApiBody({ type: CreateProductDto })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return new APiResponse(true, 'Create product successfully', product);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: ProductsListResponseDto,
  })
  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return new APiResponse(true, 'Fetch products successfully', products);
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    status: 200,
    description: 'Single product',
    type: ProductResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    return new APiResponse(true, 'Fetch product successfully', product);
  }

  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({
    status: 200,
    description: 'Updated product response',
    type: ProductResponseDto,
  })
  @ApiBody({ type: CreateProductDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(+id, updateProductDto);
    return new APiResponse(true, 'Update product successfully', product);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    return new APiResponse(true, 'Product deleted successfully', null);
  }

  @ApiOperation({ summary: 'Add product to basket' })
  @ApiResponse({
    status: 200,
    description: 'Add product to basket response',
    type: '',
  })
  @Post('add-baskets')
  @ApiBody({ type: BasketDTO })
  async addItemToBasket(@Body() basketDto: BasketDTO) {
    const result = await this.productsService.addItemToBasket(
      basketDto.user_id,
      basketDto.product_id,
    );
    return new APiResponse(true, 'Add product to basket successfully', result);
  }

  @ApiOperation({ summary: 'Remove product from basket' })
  @ApiResponse({
    status: 200,
    description: 'Remove product from basket response',
  })
  @ApiBody({ type: BasketDTO })
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
