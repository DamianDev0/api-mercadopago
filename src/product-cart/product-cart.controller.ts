import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';

@Controller('product-cart')
export class ProductCartController {
  constructor(private readonly productCartService: ProductCartService) {}

  @Post()
  create(@Body() createProductCartDto: CreateProductCartDto) {
    return this.productCartService.create(createProductCartDto);
  }

  @Get()
  findAll() {
    return this.productCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCartDto: UpdateProductCartDto) {
    return this.productCartService.update(+id, updateProductCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCartService.remove(+id);
  }
}
