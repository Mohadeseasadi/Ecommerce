import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address> ,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createAddressDto: CreateAddressDto ): Promise<Address> {
    const {userId , ...addressData} = createAddressDto ;

    const user = await this.userRepository.findOneBy({id:userId});

    if(!user) throw new NotFoundException('User not found')

    const address = this.addressRepository.create({...addressData , user});

    return await this.addressRepository.save(address);
  }

  async findAll(limit: number, page: number): Promise<Address[]> {
    const query = this.addressRepository
      .createQueryBuilder('addresses')
      .leftJoinAndSelect('addresses.user', 'users')
      .skip(( page -1 )* limit)
      .take(limit)


    return await query.getMany();
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: {id} });

    if(!address) throw new NotFoundException('Address not found');

    return address  
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);
    Object.assign(address , updateAddressDto);
    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
