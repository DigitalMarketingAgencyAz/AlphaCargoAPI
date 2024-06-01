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
const auth_guard_1 = require("../auth/auth.guard");
const public_strategy_1 = require("../auth/public-strategy");
let ParcelsController = class ParcelsController {
    parcelsService;
    constructor(parcelsService) {
        this.parcelsService = parcelsService;
    }
    async findAll(request) {
        const phoneNumber = request.user.phone;
        return await this.parcelsService.findAll(phoneNumber);
    }
    async findOne(invoiceNumber) {
        return this.parcelsService.findOneByInvoiceNumber(invoiceNumber);
    }
    async getInvoicePdf(invoiceNumber) {
        const pdfBuffer = await this.parcelsService.getInvoicePdf(invoiceNumber);
        if (!pdfBuffer) {
            throw new common_1.NotFoundException('PDF не найден');
        }
        return pdfBuffer;
    }
};
exports.ParcelsController = ParcelsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все посылки пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список всех посылок',
        type: [base_parcel_dto_1.GetParcelDto],
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/invoice/:invoiceNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить историю посылки по invoiceNumber' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Посылка найдена.',
        type: base_parcel_dto_1.GetParcelDto,
    }),
    __param(0, (0, common_1.Param)('invoiceNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/invoice/:invoiceNumber/pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить PDF файл по invoiceNumber' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'PDF файл посылки',
        content: { 'application/pdf': {} },
    }),
    __param(0, (0, common_1.Param)('invoiceNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "getInvoicePdf", null);
exports.ParcelsController = ParcelsController = __decorate([
    (0, swagger_1.ApiTags)('parcels'),
    (0, common_1.Controller)('parcels'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, public_strategy_1.Public)(),
    __metadata("design:paramtypes", [parcels_service_1.ParcelsService])
], ParcelsController);
//# sourceMappingURL=parcels.controller.js.map