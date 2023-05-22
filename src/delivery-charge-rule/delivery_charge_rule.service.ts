import { Injectable } from '@nestjs/common';
import { DeliveryChargeRule } from '../entities/delivery_charge_rule.model';

@Injectable()
export class DeliveryChargeRuleService {
  private readonly rules: DeliveryChargeRule[] = [
    { minBasketValue: 0, maxBasketValue: 10, deliveryCharge: 2.99 },
    { minBasketValue: 10, maxBasketValue: 20, deliveryCharge: 1.99 },
    { minBasketValue: 20, maxBasketValue: Infinity, deliveryCharge: 0 },
  ];

  getDeliveryCharge(basketTotal: number): number {
    const matchingRule = this.rules.find(
      (rule) =>
        basketTotal >= rule.minBasketValue && basketTotal < rule.maxBasketValue,
    );
    return matchingRule ? matchingRule.deliveryCharge : 0;
  }
}
