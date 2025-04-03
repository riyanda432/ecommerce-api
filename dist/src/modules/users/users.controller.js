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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(parseInt(id, 10));
    }
    update(id, updateUserDto) {
        return this.usersService.update(parseInt(id, 10), updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(parseInt(id, 10));
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new user',
        description: 'Creates a new user. Only administrators can create users directly. Requires admin role.'
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        description: 'User creation information'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid data provided' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Email already in use' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users',
        description: 'Retrieves all users in the system. Requires admin role.'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all users', type: [user_entity_1.User] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a user by ID',
        description: 'Retrieves a specific user by their ID. Users can access their own profile, admins can access any profile.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the user to retrieve',
        type: 'number'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the user', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - User does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a user',
        description: 'Updates a specific user. Users can update their own profile, admins can update any profile.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the user to update',
        type: 'number'
    }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
        description: 'The fields to update'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid data provided' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - User does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_decorator_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a user',
        description: 'Deletes a specific user from the system. Requires admin role.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the user to delete',
        type: 'number'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - Not authenticated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - User does not exist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map