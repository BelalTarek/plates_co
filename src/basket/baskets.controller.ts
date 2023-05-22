import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BasketService } from './baskets.service';
import { Basket } from '../entities/basket.model';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  async createBasket(): Promise<Basket> {
    return this.basketService.create('123');
  }

  @Post(':id/addItem')
  async addItemToBasket(
    @Param('id') basketId: string,
    @Body('productCode') productCode: string,
    @Body('quantity') quantity: number,
  ): Promise<Basket> {
    return this.basketService.addItem(basketId, productCode, quantity);
  }

  @Post(':id/removeItem')
  async removeItemFromBasket(
    @Param('id') basketId: string,
    @Body('productCode') productCode: string,
    @Body('quantity') quantity: number,
  ): Promise<Basket> {
    return this.basketService.removeItem(basketId, productCode, quantity);
  }

  @Get(':id')
  async getBasket(@Param('id') basketId: string): Promise<Basket> {
    return this.basketService.getBasket(basketId);
  }

  @Get(':id/total')
  async calculateBasketTotal(@Param('id') basketId: string): Promise<number> {
    return this.basketService.calculateBasketTotal(basketId);
  }
}
