import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {

    @IsString()
    @Matches(/^.{11}$/ , {message: "invalid phone number"})
    @Transform(({value}) =>  value.trim() )
    @IsNotEmpty()
    phone : string ;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: "password length is 8 charcter"})
    password: string ;

    @IsString()
    @IsNotEmpty()
    display_name: string;
}