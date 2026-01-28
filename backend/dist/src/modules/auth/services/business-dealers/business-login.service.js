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
var BusinessLoginService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessLoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../../../shared/prisma/prisma.service");
let BusinessLoginService = BusinessLoginService_1 = class BusinessLoginService {
    prisma;
    jwtService;
    logger = new common_1.Logger(BusinessLoginService_1.name);
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        this.logger.log(`Login attempt for email: ${loginDto.email}`);
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: loginDto.email },
                include: {
                    businessProfile: true,
                },
            });
            if (!user) {
                this.logger.warn(`User not found: ${loginDto.email}`);
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
            if (!isPasswordValid) {
                this.logger.warn(`Invalid password for: ${loginDto.email}`);
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const accessToken = this.generateAccessToken(user);
            const refreshToken = loginDto.rememberMe ? this.generateRefreshToken(user) : undefined;
            this.logger.log(`Successful login for: ${loginDto.email}`);
            return {
                success: true,
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                },
                business: user.businessProfile ? {
                    id: user.businessProfile.id,
                    businessName: user.businessProfile.businessName,
                    businessType: user.businessProfile.businessType,
                    status: user.businessProfile.status,
                } : undefined,
            };
        }
        catch (error) {
            this.logger.error(`Login error for ${loginDto.email}:`, error.message);
            throw error;
        }
    }
    generateAccessToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'your-secret-key',
            expiresIn: '1h',
        });
    }
    generateRefreshToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
            expiresIn: '7d',
        });
    }
};
exports.BusinessLoginService = BusinessLoginService;
exports.BusinessLoginService = BusinessLoginService = BusinessLoginService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], BusinessLoginService);
//# sourceMappingURL=business-login.service.js.map