import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { BusinessRegisterService } from '../../services/business-dealers/business-register.service';
import { BusinessRegisterDto } from '../../dtos/business-dealers/business-register.dto';

@Controller('auth/business-dealer-register')
export class BusinessRegisterController {
  private readonly logger = new Logger(BusinessRegisterController.name);

  constructor(private readonly businessRegisterService: BusinessRegisterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() businessRegisterDto: BusinessRegisterDto) {
    this.logger.log('Business registration request received:', businessRegisterDto);
    
    return this.businessRegisterService.register(businessRegisterDto);
  }
}