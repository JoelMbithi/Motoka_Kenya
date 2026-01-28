// backend/src/modules/dealers/dealers.module.ts
import { Module } from '@nestjs/common';

import { PrismaService } from '../../shared/prisma/prisma.service';
import { DealersController } from './Controllers/dealers.controller';
import { DealersService } from './services/dealer.services';

@Module({
  controllers: [DealersController],
  providers: [DealersService, PrismaService],
  exports: [DealersService],
})
export class DealersModule {}