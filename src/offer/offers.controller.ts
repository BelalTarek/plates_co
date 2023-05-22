import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OfferService } from './offers.service';
import { Offer } from '../entities/offer.model';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get(':productCode')
  async findOffersByProductCode(
    @Param('productCode') productCode: string,
  ): Promise<Offer[]> {
    return this.offerService.findOffersByProductCode(productCode);
  }

  @Post()
  async create(@Body() offer: Offer): Promise<Offer> {
    return this.offerService.create(offer);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    return this.offerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() offer: Offer): Promise<Offer> {
    return this.offerService.update(id, offer);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Offer> {
    return this.offerService.delete(id);
  }
}
