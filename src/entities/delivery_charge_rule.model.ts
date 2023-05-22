import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface DeliveryChargeRule {
  minBasketValue: number;
  maxBasketValue: number;
  deliveryCharge: number;
}

@Schema()
export class DeliveryChargeRuleSchema {
  @Prop({ required: true })
  min_amount: number;

  @Prop({ required: true })
  max_amount: number;

  @Prop({ required: true })
  delivery_charge: number;
}

export const DeliveryChargeRuleModel = SchemaFactory.createForClass(
  DeliveryChargeRuleSchema,
);
