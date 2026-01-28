import { IsString, IsEmail, IsBoolean, IsOptional, IsArray, IsNumber, Min, Max, MinLength, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class BusinessRegisterDto {
  @IsString()
  businessName: string;

  @IsString()
  businessType: string;

  @IsString()
  registrationNumber: string;

  @IsString()
  kraPin: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1900)
  @Max(new Date().getFullYear())
  yearEstablished: number;

  @IsString()
  contactPerson: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  county: string;

  @IsString()
  town: string;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialties?: string[];

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password?: string;

  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @IsBoolean()
  agreeToTerms: boolean;

  @IsBoolean()
  agreeToVerification: boolean;

  // File URLs
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsOptional()
  @IsString()
  businessLicensePath?: string;

  @IsOptional()
  @IsString()
  kraDocumentPath?: string;

  @IsOptional()
  @IsString()
  idCopyPath?: string;
}