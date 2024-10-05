import { Controller, Post, Body, UseFilters, UseInterceptors, Get, Param, Patch } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { ProductCart } from './schema/product-cart.entity';
import { HttpExceptionFilter } from '../common/filter/exception.filter';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';

@Controller('product-cart')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class ProductCartController {
  constructor(private readonly productCartService: ProductCartService) {}

  @Post()
  async addProductToCart(@Body() createProductCartDto: CreateProductCartDto): Promise<ProductCart> {
    return this.productCartService.create(createProductCartDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductCart> {
    return this.productCartService.findById(id);
  }

  @Patch(':id') 
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductCartDto: UpdateProductCartDto 
  ): Promise<ProductCart> {
    return this.productCartService.updateProduct(id, updateProductCartDto);
  }

  @Get()
  async findAll(): Promise<ProductCart[]> {
    return this.productCartService.findAll();
  }

  
}
