import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { APiResponse } from 'src/utils/api-response';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const address = await this.addressService.create(createAddressDto);

    return new APiResponse(true , 'Address created successfully' , address);
  }

  @Get()
  async findAll(    
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1
  ) {
    const addresses = await this.addressService.findAll(limit,page);
    
    return new APiResponse(true , 'Addresses fetched successfully', addresses);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const address = await this.addressService.findOne(+id);

    return new APiResponse(true, 'Address fetched successfully', address);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const newAddress = await this.addressService.update(+id, updateAddressDto);

    return new APiResponse(true, 'Address updated successfully', newAddress);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.addressService.remove(+id);

    return new APiResponse(true, 'Address deleted successfully', null);
  }
}
