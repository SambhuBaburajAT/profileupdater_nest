import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({imports:[  JwtModule.register({
  secret:'secret',
  signOptions:{expiresIn:'20d'}
}),UserModule],
  providers: [AdminService],
  exports:[AdminService,]
})
export class AdminModule {}
