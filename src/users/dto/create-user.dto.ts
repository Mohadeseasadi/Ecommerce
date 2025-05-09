import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import UserRoleEnum from "../enums/user.enum";
import { Transform } from "class-transformer";

export class CreateUserDto {

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    display_name: string;

    @IsString()
    @Matches(/^.{11}$/ , {message: "invalid phone number"})
    @Transform(({value}) =>  value.trim() )
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    @MinLength(8, {message: "password should be 8 charcter"})
    @MaxLength(16, {message: "password should be 8-16 charcter"})
    password: string;
    
    @IsEnum(UserRoleEnum, {message:"invalid role"})
    @IsOptional()
    role: UserRoleEnum;
}
