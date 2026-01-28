"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BusinessRegisterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRegisterService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../../../shared/prisma/prisma.service");
let BusinessRegisterService = BusinessRegisterService_1 = class BusinessRegisterService {
    prisma;
    logger = new common_1.Logger(BusinessRegisterService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(businessDto) {
        this.logger.log('Starting business registration with files');
        if (businessDto.password && businessDto.password !== businessDto.confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email: businessDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const existingBusiness = await this.prisma.businessProfile.findUnique({
            where: { email: businessDto.email },
        });
        if (existingBusiness) {
            throw new common_1.ConflictException('Business with this email already exists');
        }
        try {
            const password = businessDto.password || this.generateRandomPassword();
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await this.prisma.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        name: businessDto.contactPerson || businessDto.businessName,
                        email: businessDto.email,
                        phone: businessDto.phone,
                        passwordHash: hashedPassword,
                        agreeToTerms: businessDto.agreeToTerms,
                        role: 'DEALER',
                        image: businessDto.profileImageUrl || null,
                    },
                });
                const businessProfile = await prisma.businessProfile.create({
                    data: {
                        userId: user.id,
                        businessName: businessDto.businessName,
                        businessType: businessDto.businessType,
                        registrationNumber: businessDto.registrationNumber,
                        kraPin: businessDto.kraPin,
                        yearEstablished: businessDto.yearEstablished,
                        address: businessDto.address,
                        county: businessDto.county,
                        town: businessDto.town,
                        contactPerson: businessDto.contactPerson,
                        phone: businessDto.phone,
                        email: businessDto.email,
                        website: businessDto.website,
                        whatsapp: businessDto.whatsapp,
                        description: businessDto.description,
                        specialties: businessDto.specialties || [],
                        agreeToVerification: businessDto.agreeToVerification,
                        status: 'PENDING',
                        logoUrl: businessDto.logoUrl,
                        coverImageUrl: businessDto.coverImageUrl,
                        gallery: businessDto.gallery || [],
                        businessLicensePath: businessDto.businessLicensePath,
                        kraDocumentPath: businessDto.kraDocumentPath,
                        idCopyPath: businessDto.idCopyPath,
                    },
                });
                return { user, businessProfile, temporaryPassword: businessDto.password ? undefined : password };
            });
            this.logger.log('Business registration with files successful');
            return {
                success: true,
                message: 'Business registration successful! Your account is under review.',
                data: {
                    user: {
                        id: result.user.id,
                        name: result.user.name,
                        email: result.user.email,
                        phone: result.user.phone,
                        image: result.user.image,
                    },
                    business: {
                        businessName: result.businessProfile.businessName,
                        businessType: result.businessProfile.businessType,
                        status: result.businessProfile.status,
                        logoUrl: result.businessProfile.logoUrl,
                    },
                    ...(result.temporaryPassword && { temporaryPassword: result.temporaryPassword })
                },
            };
        }
        catch (error) {
            this.logger.error('Error in business registration:', error);
            throw new common_1.BadRequestException('Registration failed: ' + error.message);
        }
    }
    generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
};
exports.BusinessRegisterService = BusinessRegisterService;
exports.BusinessRegisterService = BusinessRegisterService = BusinessRegisterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusinessRegisterService);
//# sourceMappingURL=business-register.service.js.map