// File commented out to fix build errors
/*
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class CartItem {
  @Prop({ required: true })
  productId: number;

  @Prop()
  variantId: number;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ type: Number })
  priceAtAddition: number;

  @Prop({ default: Date.now })
  addedAt: Date;
}

const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class CartSync extends Document {
  @Prop({ required: true, index: true, unique: true })
  cartId: number;

  @Prop({ index: true })
  userId: number;

  @Prop({ index: true })
  sessionId: string;

  @Prop([CartItemSchema])
  items: CartItem[];

  @Prop({ default: false })
  abandoned: boolean;

  @Prop({ default: Date.now })
  lastActivity: Date;

  @Prop({ type: Object })
  deviceInfo: Record<string, any>;

  @Prop({ default: 0 })
  recoveryEmailsSent: number;
}

export const CartSyncSchema = SchemaFactory.createForClass(CartSync);

// Add compound index for abandoned cart analysis
CartSyncSchema.index({ abandoned: 1, lastActivity: -1 });

// Add index for product-based analysis
CartSyncSchema.index({ 'items.productId': 1 });

// Add TTL index for automatic cleanup of old cart data
CartSyncSchema.index({ lastActivity: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 }); // 30 days 
*/ 
