import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { BookmarkProductDTO } from '../dto/create-bookmark.dto';
import { Bookmark } from '../entities/product-bookmark.entity';
import { ProductsService } from '../products.service';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>,

    private readonly productService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createBookmarkDto: BookmarkProductDTO,
  ): Promise<{ bookmark: Bookmark | void; msg: string }> {
    const user = await this.userService.findOne(createBookmarkDto.user_id);

    const product = await this.productService.findOne(
      createBookmarkDto.product_id,
    );

    const exitingBookmark = await this.bookmarkRepo.findOne({
      where: { user: { id: user.id }, product: { id: product.id } },
    });
    if (exitingBookmark) {
      const bookmark = await this.bookmarkRepo.remove(exitingBookmark);

      return { bookmark, msg: 'deleted bookmark' };
    } else {
      const newBookmark = this.bookmarkRepo.create({
        user,
        product,
      });
      const bookmark = await this.bookmarkRepo.save(newBookmark);

      return { bookmark, msg: 'created bookmark' };
    }
  }

  async findAll() {}
}
