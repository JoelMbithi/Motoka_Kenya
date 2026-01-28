// backend/src/modules/auth/services/register.service.ts
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    // Check if passwords match
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        phone: registerDto.phone,
        passwordHash: hashedPassword,
        agreeToTerms: registerDto.agreeToTerms,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    return {
      message: 'Registration successful! Please check your email to verify your account.',
      user,
    };
  }
}