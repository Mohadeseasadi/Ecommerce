import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @CreateDateColumn()
  create_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
