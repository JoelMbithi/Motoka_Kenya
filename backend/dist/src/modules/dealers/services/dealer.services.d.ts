import { PrismaService } from 'src/shared/prisma/prisma.service';
export declare class DealersService {
    private prisma;
    constructor(prisma: PrismaService);
    getDealers(filters: {
        status?: string;
        county?: string;
        specialty?: string;
        limit?: number;
    }): Promise<{
        id: string;
        name: string;
        location: string;
        rating: number;
        reviews: number;
        totalListings: number;
        image: string;
        logoUrl: string | null;
        userImage: string | null;
        coverImage: string | null;
        gallery: string[];
        verified: boolean;
        established: number;
        description: string;
        specialties: string[];
        contactPerson: string;
        phone: string;
        email: string;
        whatsapp: string | null;
        website: string | null;
        address: string;
        county: string;
        town: string;
        businessType: string;
        registrationNumber: string | null;
        kraPin: string;
        userId: string;
        user: {
            name: string;
            email: string;
            phone: string;
            id: string;
            image: string | null;
            createdAt: Date;
        };
    }[]>;
}
