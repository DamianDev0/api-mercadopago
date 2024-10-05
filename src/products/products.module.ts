import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, MongooseModule]  
})
export class ProductsModule {}
