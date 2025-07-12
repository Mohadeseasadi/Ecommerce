import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    return new APiResponse(true, 'Fetch categories successfully', categories);
  }

  @Delete('remove-only-category/:id')
  async removeOnlyCategory(@Param('id') id: string) {
    const category = await this.categoryService.removeOnlyCategory(+id);
    return new APiResponse(true, 'Delete categories successfully', category);
  }

  @Delete('safe-remove-category/:id')
  async saferemove(@Param('id') id: string) {
    const category = await this.categoryService.safeRemove(+id);
    return new APiResponse(true, 'Delete categories successfully', category);
  }

  @Delete('remove-category/:id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(+id);
    return new APiResponse(true, 'Delete categories successfully', category);
  }
}
