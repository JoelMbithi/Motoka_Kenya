import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BusinessLoginService } from '../../services/business-dealers/business-login.service';
import { BusinessLoginDto } from '../../dtos/business-dealers/business-login.dto';


@Controller('auth/business-dealer-login')
export class BusinessLoginController {
  constructor(private readonly businessLoginService: BusinessLoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: BusinessLoginDto) {
    return this.businessLoginService.login(loginDto);
  }
}