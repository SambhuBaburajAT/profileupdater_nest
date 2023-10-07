import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, signindto, valididto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/userSchema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly usermodel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {


    try{
      const UserExist = await this.usermodel.findOne({
        email: createUserDto.email,
      });
      if (UserExist) {
        console.log(createUserDto.username);
  
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
      }
      const password = createUserDto.password;
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      new this.usermodel({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      }).save();
  
      return { HttpStatus: HttpStatus.ACCEPTED };
      

    }catch(err){
      throw new HttpException('run into an unknow error',HttpStatus.EXPECTATION_FAILED)
    }
   
  }

  async Signin(body: signindto) {
    try{


      const UserExist = await this.usermodel.findOne({ email: body.email });

      console.log(UserExist);
      if (!UserExist) {
        throw new HttpException(
          'email/password incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const passwordCheck = await bcrypt.compare(
        body.password,
        UserExist.password,
      );
      console.log(passwordCheck);
      if (!passwordCheck) {
        console.log('here');
        throw new HttpException(
          'email/password incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      if (UserExist.isActive == false) {
        throw new HttpException(
          'youraccount is suspended',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const JWTtokenvalue = {
          usename: UserExist.username,
          id: UserExist._id,
          email: UserExist.email,
        };
        console.log(process.env.JWt_code);
        return { token: jwt.sign(JWTtokenvalue, process.env.JWt_code) };
      }

    }catch(err){
      throw new HttpException('run into an unknow error',HttpStatus.EXPECTATION_FAILED)
    }
    
  




  }

  Profile() {


    return { status: 'worked' };
  }

  async getUser(id: string) {

try{
  console.log(id);
  console.log('im here');
  const a = await this.usermodel.findById(new mongoose.Types.ObjectId(id));
  console.log(a);
  return a;
}catch(err){

}

   
  }

  async userstatus(body: any) {
    try{
      console.log(body);
      const userData = await this.usermodel.findById(body.id);
      return this.usermodel.findByIdAndUpdate(body.id, {
        isActive: !userData.isActive,
      });
    }catch(err){

    }

  }
}
