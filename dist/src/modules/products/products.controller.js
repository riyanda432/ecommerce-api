"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_entity_1 = require("./entities/product.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(categoryId, search) {
        if (categoryId) {
            return this.productsService.findByCategory(parseInt(categoryId, 10));
        }
        else if (search) {
            return this.productsService.searchProducts(search);
        }
        return this.productsService.findAll();
    }
    findOne(id) {
        return this.productsService.findOne(parseInt(id, 10));
    }
    update(id, updateProductDto) {
        return this.productsService.update(parseInt(id, 10), updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(parseInt(id, 10));
    }
    updateStock(id, quantity) {
        return this.productsService.updateStock(parseInt(id, 10), quantity);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product',
        description: 'Creates a new product in the system. Requires admin role.'
    }),
    (0, swagger_1.ApiBody)({
        type: create_product_dto_1.CreateProductDto,
        description: 'Product information to create'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created successfully', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid data provided' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all products',
        description: 'Retrieves all products, with optional filtering by category or search term.'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all products matching criteria', type: [product_entity_1.Product] }),
    (0, swagger_1.ApiQuery)({
        name: 'category',
        required: false,
        description: 'Filter products by category ID',
        type: Number,
        example: 1
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search products by name or description',
        type: String,
        example: 'smartphone'
    }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a product by ID',
        description: 'Retrieves a specific product by its ID.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the product to retrieve',
        type: 'number',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the product', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - Product does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a product',
        description: 'Updates a specific product. Requires admin role.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the product to update',
        type: 'number',
        example: 1
    }),
    (0, swagger_1.ApiBody)({
        type: update_product_dto_1.UpdateProductDto,
        description: 'The product fields to update'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid data provided' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - Product does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a product',
        description: 'Deletes a specific product from the system. Requires admin role.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the product to delete',
        type: 'number',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - Product does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update product stock',
        description: 'Updates the stock quantity of a specific product. Requires admin role.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the product to update stock',
        type: 'number',
        example: 1
    }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stock updated successfully', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request or not enough stock' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - Product does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateStock", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map