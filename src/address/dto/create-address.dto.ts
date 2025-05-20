import { IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateAddressDto {

        @IsNumber()
        @IsNotEmpty()
        userId: number;

        @IsString()
        @IsNotEmpty()
        province: string;

        @IsString()
        @IsNotEmpty()
        city: string;

        @IsString()
        @IsNotEmpty()
        address: string;

        @IsString()
        @Length(10,10 , {message: 'postal code should be 10 character'})
        postal_code: string; 


        @IsString()
        @Length(11,11 , {message: 'reciver_mobile should be 10 character'})
        reciver_mobile: string; 

        @IsString()
        @IsOptional()
        description: string; 
}
