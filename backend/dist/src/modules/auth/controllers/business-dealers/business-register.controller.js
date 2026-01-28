"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BusinessRegisterController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRegisterController = void 0;
const common_1 = require("@nestjs/common");
const business_register_service_1 = require("../../services/business-dealers/business-register.service");
const business_register_dto_1 = require("../../dtos/business-dealers/business-register.dto");
let BusinessRegisterController = BusinessRegisterController_1 = class BusinessRegisterController {
    businessRegisterService;
    logger = new common_1.Logger(BusinessRegisterController_1.name);
    constructor(businessRegisterService) {
        this.businessRegisterService = businessRegisterService;
    }
    async register(businessRegisterDto) {
        this.logger.log('Business registration request received:', businessRegisterDto);
        return this.businessRegisterService.register(businessRegisterDto);
    }
};
exports.BusinessRegisterController = BusinessRegisterController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [business_register_dto_1.BusinessRegisterDto]),
    __metadata("design:returntype", Promise)
], BusinessRegisterController.prototype, "register", null);
exports.BusinessRegisterController = BusinessRegisterController = BusinessRegisterController_1 = __decorate([
    (0, common_1.Controller)('auth/business-dealer-register'),
    __metadata("design:paramtypes", [business_register_service_1.BusinessRegisterService])
], BusinessRegisterController);
//# sourceMappingURL=business-register.controller.js.map