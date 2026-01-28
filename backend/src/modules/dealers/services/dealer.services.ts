// backend/src/modules/dealers/dealers.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class DealersService {
  constructor(private prisma: PrismaService) {}

  async getDealers(filters: {
    status?: string;
    county?: string;
    specialty?: string;
    limit?: number;
  }) {
    const where: any = {};

    // Filter by status (default to APPROVED for verified dealers)
    where.status = filters.status || 'APPROVED';

    // Filter by county
    if (filters.county && filters.county !== 'All Counties') {
      where.county = filters.county;
    }

    // Filter by specialty
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
            image: true, // <-- MAKE SURE THIS IS INCLUDED
            createdAt: true,
          },
        },
      },
      take: filters.limit || 20,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform data to match frontend format
    return dealers.map(dealer => ({
      id: dealer.id,
      name: dealer.businessName,
      location: `${dealer.town}, ${dealer.county}`,
      rating: 4.5,
      reviews: 0,
      totalListings: 0,
      // USE ACTUAL IMAGES FROM DATABASE:
      image: dealer.logoUrl || '/api/placeholder/300/200', // Business logo
        logoUrl: dealer.logoUrl || null,
      userImage: dealer.user?.image || null, // User profile image
      coverImage: dealer.coverImageUrl || null, // Cover image
      gallery: dealer.gallery || [], // Gallery images
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
}