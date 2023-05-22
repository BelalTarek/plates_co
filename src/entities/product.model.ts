import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  product_code: string;
}

@Schema()
export class ProductSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  product_code: string;
}

export const ProductModel = SchemaFactory.createForClass(ProductSchema);

export type ProductDocument = Product & Document;
