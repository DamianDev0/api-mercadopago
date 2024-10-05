import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCartModule } from './product-cart/product-cart.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),

    ProductCartModule,
    UsersModule,
    ProductsModule,
    TransactionModule,
    AuthModule,

  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }