import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { ProductCart } from './schema/product-cart.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.entity';
import { Product } from '../products/schema/product.entity';


@Injectable()
export class ProductCartService {
  constructor(
    @InjectModel(ProductCart.name)
    private readonly productCartModel: Model<ProductCart>,
    private readonly userServices: UsersService,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) {}

  private async verifyIfProductsExist(updateProductCartDto: UpdateProductCartDto) {
    const products = updateProductCartDto.products || [];

    for (const productId of products) {
      const productExist = await this.productModel.exists({ _id: productId });
      if (!productExist) {
        throw new BadRequestException(`Product with ID ${productId} does not exist`);
      }
    }
  }

  private verifyIfUserExists(user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private verifyIfProductCartExists(productCart: ProductCart) {
    if (!productCart) {
      throw new NotFoundException('Product cart not found');
    }

    return productCart; 
  }

  async create(createProductCartDto: CreateProductCartDto): Promise<ProductCart> {
    const userFound = await this.userServices.findById(createProductCartDto.userId);
    this.verifyIfUserExists(userFound);
    return await this.productCartModel.create(createProductCartDto);
  }

  async findById(_id: string): Promise<ProductCart> {
    const productCart = await this.productCartModel.findById(_id).populate('products').exec();
    return this.verifyIfProductCartExists(productCart);
  }

  async updateProduct(id: string, updateProductCartDto: UpdateProductCartDto): Promise<ProductCart> {
    await this.verifyIfProductsExist(updateProductCartDto);

    const updatedCart = await this.productCartModel
      .findByIdAndUpdate(id, updateProductCartDto, { new: true })
      .exec();

    this.verifyIfProductCartExists(updatedCart);
    return updatedCart;
  }

  async findAllP(){
    return await this.productCartModel.find().populate('products').exec();
  }

  async findAll() {
    return await this.productCartModel.find().exec();
  }
}
