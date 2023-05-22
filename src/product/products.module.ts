import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel } from 'src/entities/product.model';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductModel }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
