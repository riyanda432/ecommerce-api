import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Password123!', description: 'User password' })
  password: string;
} 