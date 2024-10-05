import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Transaction extends Document {
    @Prop({ type: String, required: true, ref: 'User' }) 
    userId: string;

    @Prop({ type: String, required: true, ref: 'Product' }) 
    productCartId: string;

    @Prop({ required: true })
    quantity: number;

    @Prop()
    totalamount: number;

    @Prop()
    mercadoPagoId: string;

    @Prop()
    preferenceId: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
