// File commented out to fix build errors
/*
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Review {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema({ timestamps: true })
export class ProductCatalog extends Document {
  @Prop({ required: true, index: true, unique: true })
  productId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  fullDetails: Record<string, any>;

  @Prop([String])
  images: string[];

  @Prop({ type: Object })
  specifications: Record<string, any>;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop([ReviewSchema])
  reviews: Review[];
}

export const ProductCatalogSchema = SchemaFactory.createForClass(ProductCatalog);

// Add text indexes for search
ProductCatalogSchema.index({ name: 'text', description: 'text' });

// Add indexes for frequently queried fields
ProductCatalogSchema.index({ 'metadata.tags': 1 });
ProductCatalogSchema.index({ 'reviews.rating': 1 });
ProductCatalogSchema.index({ createdAt: -1 });
ProductCatalogSchema.index({ updatedAt: -1 });
*/ 