import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseInterceptor } from '../common/interceptor/response.interceptor';
import { HttpExceptionFilter } from '../common/filter/exception.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productsService.findProductsByCategory(category);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(decodeURIComponent(name));
  }
  
}
