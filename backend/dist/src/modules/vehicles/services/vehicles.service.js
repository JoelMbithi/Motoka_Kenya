"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let VehiclesService = class VehiclesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVehicles(filters) {
        const where = {
            status: 'active',
        };
        if (filters.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { make: { contains: filters.search, mode: 'insensitive' } },
                { model: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        if (filters.county) {
            where.county = filters.county;
        }
        const vehicles = await this.prisma.vehicle.findMany({
            where,
            include: {
                user: {
                    include: {
                        businessProfile: true,
                    },
                },
            },
            take: filters.limit || 20,
            orderBy: { createdAt: 'desc' },
        });
        return vehicles.map(vehicle => ({
            id: vehicle.id,
            title: vehicle.title,
            price: vehicle.price,
            location: `${vehicle.town || ''}, ${vehicle.county || ''}`.trim(),
            mileage: vehicle.mileage ? `${vehicle.mileage} km` : 'N/A',
            fuel: vehicle.fuelType || 'N/A',
            transmission: vehicle.transmission,
            year: vehicle.year,
            make: vehicle.make,
            model: vehicle.model,
            images: vehicle.images || [],
            verified: vehicle.user?.businessProfile?.status === 'APPROVED',
            description: vehicle.description,
            dealer: {
                id: vehicle.user?.businessProfile?.id,
                name: vehicle.user?.businessProfile?.businessName || 'Unknown Dealer',
                rating: 4.5,
            },
            condition: vehicle.condition,
            bodyType: vehicle.bodyType,
            color: vehicle.color,
            features: vehicle.features || [],
        }));
    }
    async getFeaturedVehicles() {
        const vehicles = await this.prisma.vehicle.findMany({
            where: {
                status: 'active',
            },
            include: {
                user: {
                    include: {
                        businessProfile: true,
                    },
                },
            },
            take: 6,
            orderBy: { createdAt: 'desc' },
        });
        return vehicles.map(vehicle => ({
            id: vehicle.id,
            title: vehicle.title,
            price: vehicle.price,
            location: `${vehicle.town || ''}, ${vehicle.county || ''}`.trim(),
            mileage: vehicle.mileage ? `${vehicle.mileage} km` : 'N/A',
            fuel: vehicle.fuelType || 'N/A',
            transmission: vehicle.transmission,
            year: vehicle.year,
            make: vehicle.make,
            model: vehicle.model,
            images: vehicle.images || [],
            verified: vehicle.user?.businessProfile?.status === 'APPROVED',
            description: vehicle.description,
            dealer: {
                id: vehicle.user?.businessProfile?.id,
                name: vehicle.user?.businessProfile?.businessName || vehicle.user?.name || 'Unknown Dealer',
                rating: 4.5,
            },
            condition: vehicle.condition,
            bodyType: vehicle.bodyType,
            color: vehicle.color,
            features: vehicle.features || [],
        }));
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map