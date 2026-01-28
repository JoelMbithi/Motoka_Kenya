// src/modules/auth/services/auth.service.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { BusinessLoginDto } from '../../dtos/business-dealers/business-login.dto';

@Injectable()
export class BusinessLoginService {
  private readonly logger = new Logger(BusinessLoginService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: BusinessLoginDto) {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);
    
    try {
      // Find user by email
      const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
        include: {
          businessProfile: true,
        },
      });

      if (!user) {
        this.logger.warn(`User not found: ${loginDto.email}`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
      
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for: ${loginDto.email}`);
        throw new UnauthorizedException('Invalid email or password');
      }

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = loginDto.rememberMe ? this.generateRefreshToken(user) : undefined;

      this.logger.log(`Successful login for: ${loginDto.email}`);
      
      // Return plain object
      return {
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        business: user.businessProfile ? {
          id: user.businessProfile.id,
          businessName: user.businessProfile.businessName,
          businessType: user.businessProfile.businessType,
          status: user.businessProfile.status,
        } : undefined,
      };
    } catch (error) {
      this.logger.error(`Login error for ${loginDto.email}:`, error.message);
      throw error;
    }
  }

  private generateAccessToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: '1h', // Use string directly
    });
  }

  private generateRefreshToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      expiresIn: '7d', // Use string directly
    });
  }
}