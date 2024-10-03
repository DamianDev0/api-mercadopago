import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartController } from './product-cart.controller';

@Module({
  controllers: [ProductCartController],
  providers: [ProductCartService],
})
export class ProductCartModule {}
