import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartController } from './product-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCart, ProductCartSchema } from './schema/product-cart.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ProductCart.name, schema: ProductCartSchema}
    ]),
    UsersModule,
    ProductsModule
  ],
  controllers: [ProductCartController],
  providers: [ProductCartService],
  exports: [ProductCartService]
})
export class ProductCartModule {}
