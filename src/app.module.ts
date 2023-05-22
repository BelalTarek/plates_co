import { Module } from '@nestjs/common';
import { BasketController } from './basket/baskets.controller';
import { BasketService } from './basket/baskets.service';
import { DeliveryChargeRuleService } from './delivery-charge-rule/delivery_charge_rule.service';
import { OfferService } from './offer/offers.service';
import { ProductService } from './product/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketModel } from './entities/basket.model';
import { DeliveryChargeRuleModel } from './entities/delivery_charge_rule.model';
import { OfferModel } from './entities/offer.model';
import { ProductModel } from './entities/product.model';
import { BasketModule } from './basket/baskets.module';
import { OfferModule } from './offer/offers.module';
import { ProductModule } from './product/products.module';
import { DeliveryChargeRuleModule } from './delivery-charge-rule/delivery_charge_rule.module';
import { ProductController } from './product/products.controller';
import { OfferController } from './offer/offers.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/plates_co'),
    MongooseModule.forFeature([
      { name: 'Basket', schema: BasketModel },
      { name: 'DeliveryChargeRule', schema: DeliveryChargeRuleModel },
      { name: 'Offer', schema: OfferModel },
      { name: 'Product', schema: ProductModel },
    ]),
    BasketModule,
    DeliveryChargeRuleModule,
    OfferModule,
    ProductModule,
  ],
  controllers: [BasketController, ProductController, OfferController],
  providers: [
    BasketService,
    DeliveryChargeRuleService,
    OfferService,
    ProductService,
  ],
})
export class AppModule {}
