import { PrismaService } from 'src/shared/prisma/prisma.service';
export declare class VehiclesService {
    private prisma;
    constructor(prisma: PrismaService);
    getVehicles(filters: {
        search?: string;
        county?: string;
        limit?: number;
    }): Promise<{
        id: string;
        title: string;
        price: number;
        location: string;
        mileage: string;
        fuel: string;
        transmission: string;
        year: number;
        make: string;
        model: string;
        images: string[];
        verified: boolean;
        description: string | null;
        dealer: {
            id: string | undefined;
            name: string;
            rating: number;
        };
        condition: string;
        bodyType: string;
        color: string | null;
        features: string[];
    }[]>;
    getFeaturedVehicles(): Promise<{
        id: string;
        title: string;
        price: number;
        location: string;
        mileage: string;
        fuel: string;
        transmission: string;
        year: number;
        make: string;
        model: string;
        images: string[];
        verified: boolean;
        description: string | null;
        dealer: {
            id: string | undefined;
            name: string;
            rating: number;
        };
        condition: string;
        bodyType: string;
        color: string | null;
        features: string[];
    }[]>;
}
