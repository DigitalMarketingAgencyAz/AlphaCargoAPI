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
exports.ParcelsController = void 0;
const common_1 = require("@nestjs/common");
const parcels_service_1 = require("./parcels.service");
const base_parcel_dto_1 = require("./dto/base-parcel-dto");
const swagger_1 = require("@nestjs/swagger");
let ParcelsController = class ParcelsController {
    parcelsService;
    constructor(parcelsService) {
        this.parcelsService = parcelsService;
    }
    async findAll() {
        return this.parcelsService.findAll();
    }
    findOne(id) {
        return this.parcelsService.findOne(+id);
    }
    findByTrackingNumber(trackingNumber) {
        return this.parcelsService.findByTrackingNumber(trackingNumber);
    }
};
exports.ParcelsController = ParcelsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список всех посылок',
        type: [base_parcel_dto_1.GetParcelDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить посылку по ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Посылка найдена.',
        type: base_parcel_dto_1.GetParcelDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParcelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('tracking/:trackingNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Найти посылку по трек-номеру' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Посылка найдена.',
        type: base_parcel_dto_1.GetParcelDto,
    }),
    __param(0, (0, common_1.Param)('trackingNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParcelsController.prototype, "findByTrackingNumber", null);
exports.ParcelsController = ParcelsController = __decorate([
    (0, swagger_1.ApiTags)('parcels'),
    (0, common_1.Controller)('parcels'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [parcels_service_1.ParcelsService])
], ParcelsController);
//# sourceMappingURL=parcels.controller.js.map