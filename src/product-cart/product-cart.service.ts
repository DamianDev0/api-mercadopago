import { Injectable } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';

@Injectable()
export class ProductCartService {
  create(createProductCartDto: CreateProductCartDto) {
    return 'This action adds a new productCart';
  }

  findAll() {
    return `This action returns all productCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCart`;
  }

  update(id: number, updateProductCartDto: UpdateProductCartDto) {
    return `This action updates a #${id} productCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCart`;
  }
}
