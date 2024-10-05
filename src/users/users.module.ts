import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.entity';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [],
  providers: [UsersService, PasswordService],
  exports: [UsersService] 
})
export class UsersModule {}
