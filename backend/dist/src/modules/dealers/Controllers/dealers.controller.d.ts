import { DealersService } from '../services/dealer.services';
export declare class DealersController {
    private readonly dealersService;
    constructor(dealersService: DealersService);
    getDealers(status?: string, county?: string, specialty?: string, limit?: string): Promise<{
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
