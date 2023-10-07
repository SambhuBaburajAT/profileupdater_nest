import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly getuser:UserService
    ) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some(role => role === userRole)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
// console.log(user);
    const userData=await  this.getuser.getUser(user.id)
    if(userData.isActive===false)
    {
      throw new HttpException('your account is suspended',HttpStatus.FORBIDDEN)
    }
    // console.log(userData);
    //console.log(user)
    return this.matchRoles(roles, userData.role)
 }
}