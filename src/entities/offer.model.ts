import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Offer {
  offer_type: string;
  discount_rate: number;
  product_code: string;
}

export interface OfferDocument extends Offer, Document {}

@Schema()
export class OfferSchema extends Document {
  @Prop({ required: true })
  offer_type: string;

  @Prop({ required: true })
  discount_rate: number;

  @Prop({ required: true })
  product_code: string;
}

export const OfferModel = SchemaFactory.createForClass(OfferSchema);
