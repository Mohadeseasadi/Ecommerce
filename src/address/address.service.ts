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

  async create(createAddressDto: CreateAddressDto , userId : number): Promise<Address> {
    const user = await this.userRepository.findOneByOrFail({id:userId});

    const address = this.addressRepository.create({...createAddressDto , user});

    return await this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({relations:['user']});
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
