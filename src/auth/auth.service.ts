import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserRoleEnum from 'src/users/enums/user.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(phone: string, password: string, display_name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({
      phone,
      password: hashedPassword,
      display_name,
      role: UserRoleEnum.User,
    }); 
  }

  async login(phone: string, password: string){
    const user = await this.userService.findOneByPhone(phone);

    if (!(await bcrypt.compare(password, user.password))) {
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
