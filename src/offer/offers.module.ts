import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferModel } from 'src/entities/offer.model';
import { OfferController } from './offers.controller';
import { OfferService } from './offers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Offer', schema: OfferModel }])],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
