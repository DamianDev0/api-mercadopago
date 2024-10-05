import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    category: string;
    
    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
