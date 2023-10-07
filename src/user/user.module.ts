import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/userSchema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
  JwtModule.register({
    secret:'secret',
    signOptions:{expiresIn:'20d'}
  })
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
