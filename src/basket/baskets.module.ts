import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketController } from './baskets.controller';
import { BasketService } from './baskets.service';
import { BasketModel } from '../entities/basket.model';
import { DeliveryChargeRuleService } from '../delivery-charge-rule/delivery_charge_rule.service';
import { OfferModel } from 'src/entities/offer.model';
import { ProductModel } from 'src/entities/product.model';
import { DeliveryChargeRuleModel } from 'src/entities/delivery_charge_rule.model';
import { OfferService } from 'src/offer/offers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Basket', schema: BasketModel },
      { name: 'DeliveryChargeRule', schema: DeliveryChargeRuleModel },
      { name: 'Offer', schema: OfferModel },
      { name: 'Product', schema: ProductModel },
    ]),
  ],
  controllers: [BasketController],
  providers: [BasketService, DeliveryChargeRuleService, OfferService],
})
export class BasketModule {}
