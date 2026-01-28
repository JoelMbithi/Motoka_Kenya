import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RegisterController } from './controllers/register.controller';
import { BusinessRegisterController } from './controllers/business-dealers/business-register.controller';
import { BusinessLoginController } from './controllers/business-dealers/business-login.controller';
import { RegisterService } from './services/register.service';
import { BusinessRegisterService } from './services/business-dealers/business-register.service';
import { BusinessLoginService } from './services/business-dealers/business-login.service';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    RegisterController, 
    BusinessRegisterController,
    BusinessLoginController
  ],
  providers: [
    RegisterService, 
    BusinessRegisterService,
    BusinessLoginService,
    PrismaService,
  ],
  exports: [
    BusinessRegisterService, 
    BusinessLoginService,
    JwtModule,
  ],
})
export class AuthModule {}