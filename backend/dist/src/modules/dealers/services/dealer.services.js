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
exports.DealersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let DealersService = class DealersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDealers(filters) {
        const where = {};
        where.status = filters.status || 'APPROVED';
        if (filters.county && filters.county !== 'All Counties') {
            where.county = filters.county;
        }
        if (filters.specialty && filters.specialty !== 'All Specialties') {
            where.specialties = {
                has: filters.specialty
            };
        }
        const dealers = await this.prisma.businessProfile.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        image: true,
                        createdAt: true,
                    },
                },
            },
            take: filters.limit || 20,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return dealers.map(dealer => ({
            id: dealer.id,
            name: dealer.businessName,
            location: `${dealer.town}, ${dealer.county}`,
            rating: 4.5,
            reviews: 0,
            totalListings: 0,
            image: dealer.logoUrl || '/api/placeholder/300/200',
            logoUrl: dealer.logoUrl || null,
            userImage: dealer.user?.image || null,
            coverImage: dealer.coverImageUrl || null,
            gallery: dealer.gallery || [],
            verified: dealer.status === 'APPROVED',
            established: dealer.yearEstablished || 2020,
            description: dealer.description || 'No description available',
            specialties: dealer.specialties || [],
            contactPerson: dealer.contactPerson,
            phone: dealer.phone,
            email: dealer.email,
            whatsapp: dealer.whatsapp,
            website: dealer.website,
            address: dealer.address,
            county: dealer.county,
            town: dealer.town,
            businessType: dealer.businessType,
            registrationNumber: dealer.registrationNumber,
            kraPin: dealer.kraPin,
            userId: dealer.userId,
            user: dealer.user,
        }));
    }
};
exports.DealersService = DealersService;
exports.DealersService = DealersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealersService);
//# sourceMappingURL=dealer.services.js.map