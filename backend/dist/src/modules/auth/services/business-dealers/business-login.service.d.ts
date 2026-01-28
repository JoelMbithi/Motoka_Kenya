import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { BusinessLoginDto } from '../../dtos/business-dealers/business-login.dto';
export declare class BusinessLoginService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: BusinessLoginDto): Promise<{
        success: boolean;
        accessToken: string;
        refreshToken: string | undefined;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: string;
        };
        business: {
            id: string;
            businessName: string;
            businessType: string;
            status: string;
        } | undefined;
    }>;
    private generateAccessToken;
    private generateRefreshToken;
}
