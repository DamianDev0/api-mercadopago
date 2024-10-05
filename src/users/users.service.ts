import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { User } from './schema/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../common/services/password.service'; 

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService 
  ) {
    super(userModel);
  }

  private validateMongoId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
    }
  }

  async createUser(createDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createDto.password);
    const newUser = { ...createDto, password: hashedPassword };
    return super.create(newUser);
  }

  async findUserById(id: string): Promise<User> {
    this.validateMongoId(id);
    const user = await this.userModel.findById(id);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUser(): Promise<User[]> {
    return super.findAll();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
