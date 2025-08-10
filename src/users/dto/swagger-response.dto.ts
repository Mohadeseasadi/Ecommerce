import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from '../../utils/dto/api-response.dto';
import { User } from '../entities/user.entity';

export class UserResponseDto extends ApiResponseDto<User> {
  @ApiProperty({ type: User })
  declare data: User;
}

export class UsersListResponseDto extends ApiResponseDto<User[]> {
  @ApiProperty({ type: [User] })
  declare data: User[];
}
