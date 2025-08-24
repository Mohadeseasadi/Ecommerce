import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
import UserRoleEnum from 'src/users/enums/user.enum';
import { UsersService } from 'src/users/users.service';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user: { role: UserRoleEnum } }>();

    const user = request.user as User;
    if (!user) {
      return false;
    }
    const userEntity = await this.userService.findOne(user.id);

    if (!userEntity) {
      return false;
    }

    return requiredRoles.some((role) => userEntity.role === role);
  }
}
