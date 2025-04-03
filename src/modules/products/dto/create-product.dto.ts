import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsBoolean, IsUUID, IsArray, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'iPhone 13', description: 'Product name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'The latest iPhone with amazing features', description: 'Product description', required: false })
  description?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ example: 999.99, description: 'Product price', minimum: 0 })
  price: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ example: 100, description: 'Product stock quantity', minimum: 0 })
  stock: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'IP13-128-BLUE', description: 'Product SKU', required: false })
  sku?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, description: 'Whether the product is active/available', required: false, default: true })
  isActive?: boolean;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  @ApiProperty({ 
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], 
    description: 'Product images URLs', 
    required: false, 
    type: [String] 
  })
  images?: string[];

  @IsUrl()
  @IsOptional()
  @ApiProperty({ example: 'https://example.com/image1.jpg', description: 'Main product image URL', required: false })
  mainImage?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ example: 1, description: 'Product category ID', required: false })
  categoryId?: number;
} 