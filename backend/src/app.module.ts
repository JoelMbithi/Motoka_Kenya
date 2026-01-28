import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service.js';
import { PrismaService } from './shared/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module'; 
import { DealersModule } from './modules/dealers/dealers.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DealersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}