import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Category> {
    const catgory = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!catgory) throw new NotFoundException('Category not found');
    return catgory;
  }

  async removeOnlyCategory(id: number): Promise<void> {
    const category = await this.findOne(id);

    // delete related product tpo category
    category.products = [];
    await this.categoryRepo.save(category);

    // remove category
    await this.categoryRepo.remove(category);
  }

  async safeRemove(id: number): Promise<void> {
    const category = await this.findOne(id);

    if (category.products.length > 0)
      throw new BadRequestException('THis category have more products');

    await this.categoryRepo.remove(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    await this.productRepo.remove(category.products);
    await this.categoryRepo.remove(category);
  }
}
