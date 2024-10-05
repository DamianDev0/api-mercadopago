import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Get('success')
  handleSuccess(@Query() query, @Res() res: Response) {
    console.log('Payment successful:', query);
    res.send('Payment successful!'); 
  }

  @Get('failure')
  handleFailure(@Query() query, @Res() res: Response) {
    console.log('Payment failed:', query);
    res.send('Payment failed. Please try again.'); 
  }

  @Get('pending')
  handlePending(@Query() query, @Res() res: Response) {
    console.log('Payment pending:', query);
    res.send('Payment is pending.'); 
  }
}
