import { VehiclesService } from '../services/vehicles.service';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    getVehicles(search?: string, county?: string, limit?: string): Promise<{
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
