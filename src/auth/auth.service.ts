import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserRoleEnum from 'src/users/enums/user.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService ,
        private readonly jwtService: JwtService  
    ){}


    async register(phone : string , password:string, display_name: string ){

       const hashPassword = await bcrypt.hash(password , 10); 

        return this.userService.create({
            phone, 
            password: hashPassword, 
            display_name, 
            role:UserRoleEnum.User 
        });
    }

}
 