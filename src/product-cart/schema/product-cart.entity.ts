import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class ProductCart extends Document {
    @Prop({ type: String, required: true, ref: 'User' }) 
    userId: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], required: true, ref: 'Product' })
    products: Types.ObjectId[]; 
}

export const ProductCartSchema = SchemaFactory.createForClass(ProductCart);
