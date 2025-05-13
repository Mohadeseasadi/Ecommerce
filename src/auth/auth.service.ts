import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserRoleEnum from 'src/users/enums/user.enum';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    return this.userService.create({
      phone :registerDto.phone,
      password: hashedPassword,
      display_name: registerDto.display_name,
      role: UserRoleEnum.User,
    }); 
  }

  async login(loginDto: LoginDto){
    const user = await this.userService.findOneByPhone(loginDto.phone);

    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('password is incorrect');
    }
    const payLoad = {
        phone: user.phone ,
        sub: user.id ,
        display_name: user.display_name
    }
    const token = this.jwtService.sign(payLoad)

    return {
      accessToken: token
    }
  }
}
