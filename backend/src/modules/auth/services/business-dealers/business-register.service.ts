import { Injectable, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class BusinessRegisterService {
  private readonly logger = new Logger(BusinessRegisterService.name);

  constructor(private prisma: PrismaService) {}

  async register(businessDto: any) {  // Changed to 'any' to accept file URLs
    this.logger.log('Starting business registration with files');
    
    // Check if passwords match
    if (businessDto.password && businessDto.password !== businessDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: businessDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Check if business email exists
    const existingBusiness = await this.prisma.businessProfile.findUnique({
      where: { email: businessDto.email },
    });

    if (existingBusiness) {
      throw new ConflictException('Business with this email already exists');
    }

    try {
      // Generate password if not provided
      const password = businessDto.password || this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user and business profile
      const result = await this.prisma.$transaction(async (prisma) => {
        // Create user WITH PROFILE IMAGE
        const user = await prisma.user.create({
          data: {
            name: businessDto.contactPerson || businessDto.businessName,
            email: businessDto.email,
            phone: businessDto.phone,
            passwordHash: hashedPassword,
            agreeToTerms: businessDto.agreeToTerms,
            role: 'DEALER',
            image: businessDto.profileImageUrl || null, // SAVE PROFILE IMAGE
          },
        });

        // Create business profile WITH ALL IMAGES
        const businessProfile = await prisma.businessProfile.create({
          data: {
            userId: user.id,
            businessName: businessDto.businessName,
            businessType: businessDto.businessType,
            registrationNumber: businessDto.registrationNumber,
            kraPin: businessDto.kraPin,
            yearEstablished: businessDto.yearEstablished,
            address: businessDto.address,
            county: businessDto.county,
            town: businessDto.town,
            contactPerson: businessDto.contactPerson,
            phone: businessDto.phone,
            email: businessDto.email,
            website: businessDto.website,
            whatsapp: businessDto.whatsapp,
            description: businessDto.description,
            specialties: businessDto.specialties || [],
            agreeToVerification: businessDto.agreeToVerification,
            status: 'PENDING',
            
            // Save all image URLs
            logoUrl: businessDto.logoUrl,
            coverImageUrl: businessDto.coverImageUrl,
            gallery: businessDto.gallery || [],
            
            // Save document paths
            businessLicensePath: businessDto.businessLicensePath,
            kraDocumentPath: businessDto.kraDocumentPath,
            idCopyPath: businessDto.idCopyPath,
          },
        });

        return { user, businessProfile, temporaryPassword: businessDto.password ? undefined : password };
      });

      this.logger.log('Business registration with files successful');
      
      return {
        success: true,
        message: 'Business registration successful! Your account is under review.',
        data: {
          user: {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone,
            image: result.user.image, // Include image in response
          },
          business: {
            businessName: result.businessProfile.businessName,
            businessType: result.businessProfile.businessType,
            status: result.businessProfile.status,
            logoUrl: result.businessProfile.logoUrl,
          },
          ...(result.temporaryPassword && { temporaryPassword: result.temporaryPassword })
        },
      };
    } catch (error) {
      this.logger.error('Error in business registration:', error);
      throw new BadRequestException('Registration failed: ' + error.message);
    }
  }

  private generateRandomPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}