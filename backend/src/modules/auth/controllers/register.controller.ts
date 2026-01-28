// backend/src/modules/auth/controllers/register.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.registerService.register(registerDto);
  }
}