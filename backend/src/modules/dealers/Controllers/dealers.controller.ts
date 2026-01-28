
import { Controller, Get, Query } from '@nestjs/common';
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
}