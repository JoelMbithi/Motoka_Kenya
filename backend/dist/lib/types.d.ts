export interface Vehicle {
    id: string;
    title: string;
    price: number;
    location: string;
    mileage: string;
    fuel: string;
    transmission?: string;
    year?: number;
    make?: string;
    model?: string;
    images: string[];
    verified: boolean;
    description?: string;
    seats?: number;
    dealer: {
        id: string;
        name: string;
        rating: number;
    };
    condition?: string;
    bodyType?: string;
    color?: string;
    features?: string[];
}
export interface SearchFilters {
    searchQuery?: string;
    counties?: string[];
    dealerId?: number;
    minPrice?: number;
    maxPrice?: number;
    yearRange?: {
        min: number;
        max: number;
    };
    minSeats?: number;
    maxSeats?: number;
    fuelType?: string;
    transmission?: string;
    bodyType?: string;
    condition?: string[];
    features?: string[];
}
export interface Dealer {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    totalListings: number;
    image: string;
    verified: boolean;
    established: number;
    description: string;
    specialties: string[];
}
export interface InspectionReport {
    id: string;
    vehicleId: string;
    score: number;
    date: string;
    reportNumber: string;
    engine: string;
    transmission: string;
    brakes: string;
    suspension: string;
    electrical: string;
    body: string;
    location: string;
    inspector: {
        name: string;
        company: string;
        license: string;
        experience: string;
        phone: string;
        email: string;
        certifications: string[];
    };
}
