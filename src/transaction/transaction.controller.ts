import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

 
  @Post()
  async createTransaction(
    @Body('userId') userId: string,
    @Body('productCartId') productCartId: string,
  ) {
    const result = await this.transactionService.createTransaction(userId, productCartId);

    return {
      message: 'Transaction created successfully',
      preferenceId: result.id,  
      init_point: result.init_point, 
      sandbox_init_point: result.sandbox_init_point,
        
    };
  }

  @Get()
  async allTransactions() {
    const transactions = await this.transactionService.allTransaction();
    return transactions;
}
}