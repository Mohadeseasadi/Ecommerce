import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import UserRoleEnum from '../enums/user.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'mohadese', description: 'name must be  not empty' })
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  display_name: string;

  @ApiProperty({
    example: '09123222233',
    description: 'phone number must be 11 character',
  })
  @IsString()
  @Matches(/^.{11}$/, { message: 'invalid phone number' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    example: '12345678',
    description: 'password length must be 8 character ',
  })
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'password should be 8 charcter' })
  @MaxLength(16, { message: 'password should be 8-16 charcter' })
  password: string;

  @IsEnum(UserRoleEnum, { message: 'invalid role' })
  @IsOptional()
  role: UserRoleEnum;
}
