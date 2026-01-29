import { InspectionReport, SearchFilters, Vehicle } from "./types";
export declare const vehicleApi: {
    getAll: (filters?: SearchFilters) => Promise<{
        data: Vehicle[];
    }>;
    getById: (id: string | number) => Promise<{
        data: Vehicle | null;
        error?: string;
    }>;
    incrementViews: (id: string | number) => Promise<{
        success: boolean;
        error?: string;
    }>;
    getFeatured: () => Promise<Vehicle[]>;
};
export declare const inspectionApi: {
    getByVehicle: (vehicleId: string | number) => Promise<{
        data: InspectionReport | null;
        error?: string;
    }>;
};
