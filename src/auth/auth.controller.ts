import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filter/exception.filter';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('register')
 async register(@Body() registerDt0: RegisterDto){
   return this.authService.registerUser(registerDt0);
 }

 @Get('users')
 findAllUsers(){
   return this.authService.findAllUsers();
 }

 @Post('login')
 async login(@Body() loginDto: LoginDto){
   return this.authService.loginUser(loginDto);
 }

  
}
