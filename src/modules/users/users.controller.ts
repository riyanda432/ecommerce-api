import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, UserRole } from '../auth/decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Automatically applies class-transformer (excludes @Exclude fields like password)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Create a new user',
    description: 'Creates a new user. Only administrators can create users directly. Requires admin role.'
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User creation information'
  })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already in use' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Get all users',
    description: 'Retrieves all users in the system. Requires admin role.'
  })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Get a user by ID',
    description: 'Retrieves a specific user by their ID. Users can access their own profile, admins can access any profile.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: 'number'
  })
  @ApiResponse({ status: 200, description: 'Return the user', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Not Found - User does not exist' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(parseInt(id, 10));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Update a user',
    description: 'Updates a specific user. Users can update their own profile, admins can update any profile.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    type: 'number'
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'The fields to update'
  })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Not Found - User does not exist' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(parseInt(id, 10), updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Delete a user',
    description: 'Deletes a specific user from the system. Requires admin role.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete',
    type: 'number'
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Not authenticated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Not Found - User does not exist' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(parseInt(id, 10));
  }
} 