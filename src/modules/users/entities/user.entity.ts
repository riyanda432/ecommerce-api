import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'User email address (unique)' })
  email: string;

  @Column()
  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Whether user email is verified' })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: 'User phone number' })
  phoneNumber?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'User profile picture URL' })
  profilePicture?: string;

  @Column({ default: 'user' })
  @ApiProperty({ description: 'User role (user, admin)' })
  role: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'When the user was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'When the user was last updated' })
  updatedAt: Date;

  // Helper methods
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
} 