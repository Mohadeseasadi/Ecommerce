import { Body, Controller, Get, Post } from '@nestjs/common';
import { APiResponse } from 'src/utils/api-response';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return new APiResponse(true, 'Create category successfully', category);
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return new APiResponse(true, 'fetch categories successfully', categories);
  }
}
