import { IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
   @IsString()
   userId: string;

   @IsString()
   productId: string;

   @IsNumber()
   totalAmount: number;
}
