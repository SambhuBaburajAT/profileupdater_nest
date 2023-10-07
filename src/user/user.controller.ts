import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, signindto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { GetUser } from 'src/auth/decorator/getUserdecorator';
import { Public } from 'src/auth/decorator/publicDecorator';
import { Role } from 'src/interface/Roles';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Public()
  @Post('signup')
  Signin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
@Public()
  @Post('signin')
  Login(@Body() body: signindto) {
    return this.userService.Signin(body);
  }
@hasRoles(Role.USER)
@UseGuards(RolesGuard)
  @Get('profile')
  Profile(@GetUser() user) {
  

    return this.userService.Profile();
  }

  @Post('profileupdate')
  ProfileUpdate(@Body() createUserDto: CreateUserDto) {
    // return this.userService.Signin();
  }

  @hasRoles(Role.ADMIN)
@UseGuards(RolesGuard)
  @Post('admin/controluser')
  controluser(@Body() createUserDto: signindto) {
    return this.userService.userstatus(createUserDto);
  }



}
