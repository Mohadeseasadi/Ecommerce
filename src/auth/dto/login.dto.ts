import { IsNotEmpty, IsString, Matches, MinLength, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {

    @IsString()
    @Matches(/^.{11}$/ , {message: "invalid phone number"})
    @Transform(({value}) =>  value.trim() )
    @IsNotEmpty()
    phone : string ;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: "password length is 8 charcter"})
    @MaxLength(16, {message: "password should be 8-16 charcter"})
    password: string ;

}