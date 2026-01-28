import { PrismaService } from 'src/shared/prisma/prisma.service';
export declare class BusinessRegisterService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    register(businessDto: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    private generateRandomPassword;
}
