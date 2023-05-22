import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
