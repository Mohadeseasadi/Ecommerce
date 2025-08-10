import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<TData> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  data: TData;
}
