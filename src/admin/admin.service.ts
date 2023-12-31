import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(private readonly userservice:UserService){}

  userstatus(body){
// this.userservice.userstatus(body)

    return true
  }



  create(createAdminDto: CreateAdminDto) {
    
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
