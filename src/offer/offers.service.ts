import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from '../entities/offer.model';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel('Offer') private readonly offerModel: Model<Offer>,
  ) {}

  async findOffersByProductCode(productCode: string): Promise<Offer[]> {
    return this.offerModel.find({ product_code: productCode }).exec();
  }

  async create(offer: Offer): Promise<Offer> {
    const createdOffer = new this.offerModel(offer);
    return createdOffer.save();
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().exec();
  }

  async findOne(id: string): Promise<Offer> {
    return this.offerModel.findById(id).exec();
  }

  async update(id: string, offer: Offer): Promise<Offer> {
    return this.offerModel.findByIdAndUpdate(id, offer, { new: true }).exec();
  }

  async delete(id: string): Promise<Offer> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }
}
