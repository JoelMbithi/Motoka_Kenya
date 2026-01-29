// backend/src/modules/vehicles/controllers/vehicles.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { VehiclesService } from '../services/vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async getVehicles(
    @Query('search') search?: string,
    @Query('county') county?: string,
    @Query('limit') limit?: string,
  ) {
    return this.vehiclesService.getVehicles({
      search,
      county,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('featured')
  async getFeaturedVehicles() {
    return this.vehiclesService.getFeaturedVehicles();
  }
}