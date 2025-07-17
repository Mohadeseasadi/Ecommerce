import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const alreadyUser = await this.checkExist(createUserDto.phone);

      if (!alreadyUser) {
        const newUser = this.userRepository.create(createUserDto);

        return await this.userRepository.save(newUser);
      } else {
        throw new BadRequestException(
          'There is a user with this phone number in the system.',
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException('Error creating user');
    }
  }

  async findAll(limit: number, page: number): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('users');

    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`Not found user by id ${id}`);

    return user;
  }

  async findOneByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ phone });

    if (!user) throw new NotFoundException(`Not found user by phone ${phone}`);

    return user;
  }

  async checkExist(phone: string): Promise<boolean> {
    return (await this.userRepository.findOneBy({ phone })) ? true : false;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);

    try {
      const userUpdated = await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });

      return userUpdated;
    } catch (error) {
      throw new BadRequestException('Error updating user');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Not found user by id ${id}`);
    }
  }

  async addProductToBasketById(
    userId: number,
    productId: number,
  ): Promise<User> {
    const [user, product] = await Promise.all([
      this.userRepository.findOne({
        where: { id: userId },
        relations: ['basket_items'],
      }),
      this.productRepository.findOneBy({ id: productId }),
    ]);

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    if (!product)
      throw new NotFoundException(`Product with ID ${productId} not found`);

    const alreadyExists = user.basket_items.some(
      (item) => item.id === product.id,
    );
    if (alreadyExists) return user;

    user.basket_items = [...user.basket_items, product];
    return this.userRepository.save(user);
  }

  async removeProductFromBasket(
    userId: number,
    productId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['basket_items'],
    });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const originalLength = user.basket_items.length;
    user.basket_items = user.basket_items.filter(
      (item) => item.id !== productId,
    );

    if (user.basket_items.length === originalLength) {
      throw new NotFoundException('Product not found in basket');
    }

    await this.userRepository.save(user);
  }
}
