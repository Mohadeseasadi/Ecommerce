import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { UsersModule } from 'src/users/users.module';
import { BookmarksController } from './controllers/boomark.controller';
import { Bookmark } from './entities/product-bookmark.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { BookmarksService } from './services/bookmark.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Bookmark]),
    UsersModule,
  ],
  controllers: [ProductsController, BookmarksController],
  providers: [ProductsService, BookmarksService],
  exports: [ProductsService],
})
export class ProductsModule {}
