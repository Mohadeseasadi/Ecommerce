import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import UserRoleEnum from "../enums/user.enum";

export class UpdateUserDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    display_name: string;
    
    @IsEnum(UserRoleEnum, {message:"invalid role"})
    @IsOptional()
    role: UserRoleEnum;
}
