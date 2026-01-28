"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const register_controller_1 = require("./controllers/register.controller");
const business_register_controller_1 = require("./controllers/business-dealers/business-register.controller");
const business_login_controller_1 = require("./controllers/business-dealers/business-login.controller");
const register_service_1 = require("./services/register.service");
const business_register_service_1 = require("./services/business-dealers/business-register.service");
const business_login_service_1 = require("./services/business-dealers/business-login.service");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [
            register_controller_1.RegisterController,
            business_register_controller_1.BusinessRegisterController,
            business_login_controller_1.BusinessLoginController
        ],
        providers: [
            register_service_1.RegisterService,
            business_register_service_1.BusinessRegisterService,
            business_login_service_1.BusinessLoginService,
            prisma_service_1.PrismaService,
        ],
        exports: [
            business_register_service_1.BusinessRegisterService,
            business_login_service_1.BusinessLoginService,
            jwt_1.JwtModule,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map