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
exports.OfficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const office_service_1 = require("./office.service");
const office_dto_1 = require("./dto/office.dto");
const public_strategy_1 = require("../auth/public-strategy");
let OfficeController = class OfficeController {
    officeService;
    constructor(officeService) {
        this.officeService = officeService;
    }
    async getAllOffices() {
        return this.officeService.findAll();
    }
    async getOfficeById(id) {
        const office = await this.officeService.findOneById(id);
        if (!office) {
            throw new common_1.NotFoundException(`Office with ID ${id} not found`);
        }
        return office;
    }
};
exports.OfficeController = OfficeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все офисы' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список всех офисов',
        type: [office_dto_1.OfficeDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfficeController.prototype, "getAllOffices", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить офис по ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Офис по заданному ID',
        type: office_dto_1.OfficeDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Офис не найден' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OfficeController.prototype, "getOfficeById", null);
exports.OfficeController = OfficeController = __decorate([
    (0, public_strategy_1.Public)(),
    (0, common_1.Controller)('offices'),
    (0, swagger_1.ApiTags)('offices'),
    __metadata("design:paramtypes", [office_service_1.OfficeService])
], OfficeController);
//# sourceMappingURL=office.controller.js.map