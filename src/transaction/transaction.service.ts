import { Injectable, NotFoundException } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schema/transaction.entity';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { ProductCartService } from '../product-cart/product-cart.service';
import { Product } from '../products/schema/product.entity';
import { ProductCart } from '../product-cart/schema/product-cart.entity';
import { User } from '../users/schema/user.entity';

@Injectable()
export class TransactionService {
  private client: MercadoPagoConfig;

  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private readonly usersService: UsersService,
    private readonly productsCartService: ProductCartService,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: 'APP_USR-290537081224332-100420-3609fbd0d203267bf674f3b2082a8f08-2019328425',
      options: { timeout: 5000 },
    });
  }

  private async findProducts(products_id: Object[]) {
    let products = [];

    for (const id of products_id) {
      let productsFound = await this.productModel.findOne({ _id: id });
      products.push(productsFound);
    }

    return products;
  }

  private validateIfExistProductCartAndUser(
    user: User,
    productCart: ProductCart,
  ) {
    if (!user || !productCart) {
      throw new NotFoundException('User or Product Cart not found');
    }
  }

  private calculateTotalAmount(products: Product[]){
    let totalAmount = 0;
    
    for (const product of products) {
      totalAmount += product.price;
    }

    return totalAmount
  }

  private async createPreference(user: User, products_id: Object[], productCartId: string, totalAmount: number){
    const preference = new Preference(this.client);
    const preferenceData = {
      items: [
        {
          id: productCartId,
          title: user.name,
          quantity: products_id.length,
          unit_price: totalAmount,
        },
      ],
      payer: {
        email: user.email,
      },
      auto_return: 'approved',
      back_urls: {
        success: 'http://localhost:3000/api/v1/payments/success', 
        failure: 'http://localhost:3000/api/v1/payments/failure',
        pending: 'http://localhost:3000/api/v1/payments/pending',
      },
    };

    const result = await preference.create({ body: preferenceData });

    return result
  }

  private createTransactionModel(userId: string, productCartId: string ,products_id: Object[], totalAmount: number, preferenceId: string){
    const transaction = new this.transactionModel({
      userId,
      productCartId,
      quantity: products_id.length,
      totalAmount: totalAmount,
      mercadoPagoId: preferenceId,
      preferenceId,
    });

    return transaction
  }

  async createTransaction(userId: string, productCartId: string) {
    const user = await this.usersService.findById(userId);
    const productCart = await this.productsCartService.findById(productCartId);

    this.validateIfExistProductCartAndUser(user, productCart)

    const products_id = productCart.products;
    const products = await this.findProducts(products_id);

    const totalAmount = this.calculateTotalAmount(products)

    const result = await this.createPreference(user, products_id, productCartId, totalAmount)

    const { id: preferenceId } = result;

    const transaction = this.createTransactionModel(userId, productCartId, products_id, totalAmount, preferenceId)

    await transaction.save();

    return result;
  }

  async allTransaction() {
    return await this.transactionModel.find().exec();
  }
}