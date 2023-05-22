import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Basket, BasketDocument } from '../entities/basket.model';
import { ProductDocument } from '../entities/product.model';
import { DeliveryChargeRuleService } from '../delivery-charge-rule/delivery_charge_rule.service';
import { OfferService } from 'src/offer/offers.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('Basket')
    private readonly basketModel: Model<BasketDocument>,
    private readonly deliveryChargeRuleService: DeliveryChargeRuleService,
    private readonly offerService: OfferService,
  ) {}

  async create(userId: string): Promise<Basket> {
    const basket = new this.basketModel({ userId, items: [] });
    return basket.save();
  }

  async addItem(
    basketId: string,
    productCode: string,
    quantity: number,
  ): Promise<Basket> {
    const basket = await this.basketModel.findById(basketId).exec();
    const product = await this.productModel
      .findOne({ product_code: productCode })
      .exec();
    if (!basket || !product) {
      throw new Error('Basket or product not found');
    }
    const itemIndex = basket.items.findIndex(
      (item) => item.product_code === productCode,
    );
    if (itemIndex === -1) {
      basket.items.push({
        product_code: productCode,
        quantity,
        price: product.price,
      });
    } else {
      basket.items[itemIndex].quantity += quantity;
    }
    return basket.save();
  }

  async removeItem(
    basketId: string,
    productCode: string,
    quantity: number,
  ): Promise<Basket> {
    const basket = await this.basketModel.findById(basketId).exec();
    if (!basket) {
      throw new Error('Basket not found');
    }
    const itemIndex = basket.items.findIndex(
      (item) => item.product_code === productCode,
    );
    if (itemIndex === -1) {
      throw new Error('Item not found in basket');
    }
    basket.items[itemIndex].quantity -= quantity;
    if (basket.items[itemIndex].quantity <= 0) {
      basket.items.splice(itemIndex, 1);
    }
    return basket.save();
  }

  async getBasket(basketId: string): Promise<Basket> {
    const basket = await this.basketModel.findById(basketId).exec();
    if (!basket) {
      throw new Error('Basket not found');
    }
    return basket;
  }

  async calculateBasketTotal(basketId: string) {
    const basket = await this.getBasket(basketId);
    const itemsTotal = basket.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    const deliveryCharge =
      this.deliveryChargeRuleService.getDeliveryCharge(itemsTotal);
    const productCodes = basket.items.map((item) => item.product_code);
    const uniqueProductCodes = [...new Set(productCodes)];
    let total = 0;
    for (let i = 0; i < uniqueProductCodes.length; i++) {
      const productCode = uniqueProductCodes[i];
      const items = basket.items.filter(
        (item) => item.product_code === productCode,
      );
      const producQuantity = items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      const price = items[0].price; // assume all items of the same product have the same price
      total += producQuantity * price;
      const offers = await this.offerService.findOffersByProductCode(
        productCode,
      );
      offers.forEach((offer) => {
        if (offer.offer_type === 'buy-one-get-one-free') {
          const quantity = Math.floor(producQuantity / 2);
          const discountAmount = quantity * offer.discount_rate;
          total -= discountAmount;
        } else if (offer.offer_type === 'buy-one-get-one-half-price') {
          const quantity = Math.floor(producQuantity / 2);
          const discountAmount = quantity * (offer.discount_rate / 2);
          total -= discountAmount;
        } else if (offer.offer_type === 'percentage-off') {
          const discountAmount = total * offer.discount_rate;
          total -= discountAmount;
        }
      });
    }
    return total + deliveryCharge;
  }
}
