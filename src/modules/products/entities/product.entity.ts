import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the product' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Product name' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Product description', required: false })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'Product price' })
  price: number;

  @Column({ default: 0 })
  @ApiProperty({ description: 'Product stock quantity' })
  stock: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Product SKU (Stock Keeping Unit)', required: false })
  sku?: string;

  @Column({ default: true })
  @ApiProperty({ description: 'Whether the product is active/available' })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  @ApiProperty({ description: 'Product images URLs', required: false, type: [String] })
  images?: string[];

  @Column({ nullable: true })
  @ApiProperty({ description: 'Main product image URL', required: false })
  mainImage?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Product category ID', required: false })
  categoryId?: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'When the product was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'When the product was last updated' })
  updatedAt: Date;
} 