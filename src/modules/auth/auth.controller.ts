import { Controller, Post, Body, UseGuards, Get, Request, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ 
    summary: 'Register a new user',
    description: 'Creates a new user account with the provided details.'
  })
  @ApiBody({ 
    type: RegisterDto,
    description: 'User registration information including email, name, and password'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'JWT token for authentication'
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'user@example.com' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            role: { type: 'string', example: 'user' },
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data provided' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already in use' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticates a user and returns a JWT token'
  })
  @ApiBody({ 
    type: LoginDto,
    description: 'User credentials'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User logged in successfully',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'JWT token for authentication'
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'user@example.com' },
            role: { type: 'string', example: 'user' },
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Get user profile',
    description: 'Returns the authenticated user\'s profile information'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the user profile', 
    type: User 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token' })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }
} 
 