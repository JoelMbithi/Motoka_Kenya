// backend/src/modules/vehicles/services/vehicles.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async getVehicles(filters: {
    search?: string;
    county?: string;
    limit?: number;
  }) {
    const where: any = {
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
    // SIMPLIFIED query - show ALL active vehicles
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

    // Return whatever vehicles exist (could be empty array)
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
}