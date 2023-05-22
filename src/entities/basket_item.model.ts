import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface BasketItem {
  product_code: string;
  price: number;
  quantity: number;
}

@Schema()
export class BasketItemSchema {
  @Prop({ required: true })
  product_code: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

export const BasketItemModel = SchemaFactory.createForClass(BasketItemSchema);

export type BasketItemDocument = BasketItem & Document;
