import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { APiResponse } from 'src/utils/api-response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return new APiResponse(true , 'User created successfully' , user);     
  }

  @Get()
  async findAll(
    @Query('limit') limit: number=10 ,
    @Query('page') page:number=1
  ) {
    const users = await this.usersService.findAll(limit, page);
    return new APiResponse(true , 'Users fetched successfully' , users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    return new APiResponse(true , 'User fetched successflly' ,user )
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return new APiResponse(true , 'User updated successfully', user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

  }
}
