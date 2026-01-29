import { PrismaService } from '../../../shared/prisma/prisma.service';
import { RegisterDto } from '../dtos/register.dto';
export declare class RegisterService {
    private prisma;
    constructor(prisma: PrismaService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            name: string;
            id: string;
            email: string;
            phone: string;
            createdAt: Date;
        };
    }>;
}
