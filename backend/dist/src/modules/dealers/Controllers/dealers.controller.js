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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealersController = void 0;
const common_1 = require("@nestjs/common");
const dealer_services_1 = require("../services/dealer.services");
let DealersController = class DealersController {
    dealersService;
    constructor(dealersService) {
        this.dealersService = dealersService;
    }
    async getDealers(status, county, specialty, limit) {
        return this.dealersService.getDealers({
            status,
            county,
            specialty,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async getDealerById(id) {
        const dealer = await this.dealersService.getDealerById(id);
        if (!dealer) {
            throw new common_1.NotFoundException(`Dealer with ID ${id} not found`);
        }
        return dealer;
    }
    async getDealerVehicles(id) {
        const vehicles = await this.dealersService.getDealerVehicles(id);
        if (!vehicles) {
            throw new common_1.NotFoundException(`Dealer with ID ${id} not found`);
        }
        return vehicles;
    }
};
exports.DealersController = DealersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('county')),
    __param(2, (0, common_1.Query)('specialty')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], DealersController.prototype, "getDealers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DealersController.prototype, "getDealerById", null);
__decorate([
    (0, common_1.Get)(':id/vehicles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DealersController.prototype, "getDealerVehicles", null);
exports.DealersController = DealersController = __decorate([
    (0, common_1.Controller)('dealers'),
    __metadata("design:paramtypes", [dealer_services_1.DealersService])
], DealersController);
//# sourceMappingURL=dealers.controller.js.map