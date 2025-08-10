import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { APiResponse } from 'src/utils/api-response';
import { CreateUserDto } from './dto/create-user.dto';
import {
  UserResponseDto,
  UsersListResponseDto,
} from './dto/swagger-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users Management')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({
    status: 201,
    description: 'Return New User',
    type: UserResponseDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new APiResponse(true, 'User created successfully', user);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({
    status: 200,
    description: 'Return All Users',
    type: UsersListResponseDto,
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get()
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const users = await this.usersService.findAll(limit, page);
    return new APiResponse(true, 'Users fetched successfully', users);
  }

  @ApiOperation({ summary: 'Get Single User' })
  @ApiResponse({
    status: 200,
    description: 'Return Single User',
    type: UserResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return new APiResponse(true, 'User fetched successfully', user);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Return Updated User',
    type: UserResponseDto,
  })
  @Patch(':id')
  @ApiBody({
    type: UpdateUserDto,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return new APiResponse(true, 'User updated successfully', user);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);
    return new APiResponse(true, 'User deleted successfully', null);
  }
}
