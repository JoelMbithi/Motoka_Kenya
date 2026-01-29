// backend/src/modules/vehicles/vehicles.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controler';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaService],
  exports: [VehiclesService],
})
export class VehiclesModule {}