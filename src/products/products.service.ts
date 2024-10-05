import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from '../common/services/base.service';
import { Product } from './schema/product.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    super(productModel);
  }

  private validateMongoId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
    }
  }


  async createProduct(createDto: CreateProductDto): Promise<Product> {
    return await super.create(createDto);
  }

  async findAllProducts(): Promise<Product[]> {
    return await super.findAll();
  }

  async findProductById(id: string): Promise<Product> {
    this.validateMongoId(id);
    return await super.findById(id);
  }

  async updateProduct(id: string, updateDto: UpdateProductDto): Promise<Product> {
    return await super.update(id, updateDto);
  }

  async deleteProduct(id: string): Promise<Product> {
    return await super.delete(id);
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.productModel.find({ name }).exec();
  }

  async findProductsByCategory(category: string): Promise<Product[]> {
    return await this.productModel.find({ category }).exec();
  }
}
