import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.bookmarks)
  product: Product;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;
}
