import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schema/transaction.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ProductCartModule } from 'src/product-cart/product-cart.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Transaction.name, schema: TransactionSchema},
    ]),
    UsersModule,
    ProductsModule,
    ProductCartModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
