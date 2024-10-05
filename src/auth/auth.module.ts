import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from '../common/services/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'), 
        signOptions: { expiresIn: '1hr' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
