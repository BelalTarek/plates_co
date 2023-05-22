import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BasketItem, BasketItemModel } from './basket_item.model';

export interface Basket extends Document {
  created_at: Date;
  updated_at: Date;
  delivery_charge_rule_id: string;
  offer_id?: string;
  items: BasketItem[];
}

@Schema()
export class BasketSchema {
  @Prop({ required: true, default: Date.now })
  created_at: Date;

  @Prop({ required: true, default: Date.now })
  updated_at: Date;

  @Prop({ required: true, default: '0' })
  delivery_charge_rule_id: string;

  @Prop()
  offer_id: string;

  @Prop({ type: [BasketItemModel], required: true })
  items: BasketItem[];
}

export const BasketModel = SchemaFactory.createForClass(BasketSchema);

export type BasketDocument = Basket & Document;
