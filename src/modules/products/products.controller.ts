import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, UserRole } from '../auth/decorators/roles.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Creates a new product in the system. Requires admin role.'
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'Product information to create'
  })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieves all products, with optional filtering by category or search term.'
  })
  @ApiResponse({ status: 200, description: 'Returns all products matching criteria', type: [Product] })
  @ApiQuery({ 
    name: 'category', 
    required: false, 
    description: 'Filter products by category ID',
    type: Number,
    example: 1
  })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Search products by name or description',
    type: String,
    example: 'smartphone'
  })
  findAll(
    @Query('category') categoryId?: string,
    @Query('search') search?: string,
  ): Promise<Product[]> {
    if (categoryId) {
      return this.productsService.findByCategory(parseInt(categoryId, 10));
    } else if (search) {
      return this.productsService.searchProducts(search);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a product by ID',
    description: 'Retrieves a specific product by its ID.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to retrieve',
    type: 'number',
    example: 1
  })
  @ApiResponse({ status: 200, description: 'Returns the product', type: Product })
  @ApiResponse({ status: 404, description: 'Not Found - Product does not exist' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(parseInt(id, 10));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update a product',
    description: 'Updates a specific product. Requires admin role.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to update',
    type: 'number',
    example: 1
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'The product fields to update'
  })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: Product })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Not Found - Product does not exist' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(parseInt(id, 10), updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Deletes a specific product from the system. Requires admin role.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to delete',
    type: 'number',
    example: 1
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Not Found - Product does not exist' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(parseInt(id, 10));
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update product stock',
    description: 'Updates the stock quantity of a specific product. Requires admin role.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to update stock',
    type: 'number',
    example: 1
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          example: 10,
          description: 'The new stock quantity'
        }
      },
      required: ['quantity']
    },
    description: 'Stock quantity information'
  })
  @ApiResponse({ status: 200, description: 'Stock updated successfully', type: Product })
  @ApiResponse({ status: 400, description: 'Bad request or not enough stock' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Not Found - Product does not exist' })
  updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ): Promise<Product> {
    return this.productsService.updateStock(parseInt(id, 10), quantity);
  }
} 