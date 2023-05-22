import { Module } from '@nestjs/common';
import { DeliveryChargeRuleService } from './delivery_charge_rule.service';

@Module({
  providers: [DeliveryChargeRuleService],
  exports: [DeliveryChargeRuleService],
})
export class DeliveryChargeRuleModule {}
