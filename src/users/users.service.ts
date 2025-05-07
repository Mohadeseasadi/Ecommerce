import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);

      return await this.userRepository.save(newUser);

    } catch (error) {
      throw new BadRequestException('Error creating user')
    }
  }

  async findAll(limit: number, page: number): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('users');

    query.skip((page -1)*limit).take(limit) ;  
    
    return await query.getMany();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({id});

    if(!user) throw new NotFoundException(`Not found user by id ${id}`);

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User| null> {
    const user = await this.findOne(id);

    try {
      const userUpdated = await this.userRepository.save({
        ...user , 
        ...updateUserDto
      });

      return userUpdated ;

    } catch (error) {
      throw new BadRequestException('Error updating user')
    }
  }

  async remove(id: number): Promise<void> {

  }
}
