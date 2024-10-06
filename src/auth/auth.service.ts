import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from '../common/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) { }

  private generateToken(user: any): string {
    const payload = { sub: user._id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async registerUser(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.userService.createUser(registerDto)
  }

  async loginUser({ email, password }: LoginDto) {
    const findUser = await this.userService.findUserByEmail(email)

    if (!findUser) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await this.passwordService.comparePassword(password, findUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = this.generateToken(findUser);
    return {
      accessToken
    };
  }

  async findAllUsers(){
    return this.userService.findAllUser();
  }
}
