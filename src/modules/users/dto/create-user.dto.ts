import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John', description: 'User first name' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastName: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'Password123!', description: 'User password (min 8 characters)' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '+1234567890', description: 'User phone number', required: false })
  phoneNumber?: string;
} 