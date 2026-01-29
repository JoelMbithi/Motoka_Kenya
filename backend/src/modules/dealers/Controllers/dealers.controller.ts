import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { DealersService } from '../services/dealer.services';

@Controller('dealers')
export class DealersController {
  constructor(private readonly dealersService: DealersService) {}

  @Get()
  async getDealers(
    @Query('status') status?: string,
    @Query('county') county?: string,
    @Query('specialty') specialty?: string,
    @Query('limit') limit?: string,
  ) {
    return this.dealersService.getDealers({
      status,
      county,
      specialty,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  // ADD THIS NEW ENDPOINT
  @Get(':id')
  async getDealerById(@Param('id') id: string) {
    const dealer = await this.dealersService.getDealerById(id);
    
    if (!dealer) {
      throw new NotFoundException(`Dealer with ID ${id} not found`);
    }
    
    return dealer;
  }

  // ADD THIS NEW ENDPOINT
  @Get(':id/vehicles')
  async getDealerVehicles(@Param('id') id: string) {
    const vehicles = await this.dealersService.getDealerVehicles(id);
    
    if (!vehicles) {
      throw new NotFoundException(`Dealer with ID ${id} not found`);
    }
    
    return vehicles;
  }
}