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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OfficeDto {
    address;
    contactNumbers;
    cityId;
    countryId;
    openingHour;
    closingHour;
}
exports.OfficeDto = OfficeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Адрес офиса', example: '123 Main St' }),
    __metadata("design:type", String)
], OfficeDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Контактные номера',
    }),
    __metadata("design:type", String)
], OfficeDto.prototype, "contactNumbers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Идентификатор города', example: 1 }),
    __metadata("design:type", Number)
], OfficeDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Идентификатор страны', example: 1 }),
    __metadata("design:type", Number)
], OfficeDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Время открытия (24-часовой формат)',
        example: 9,
    }),
    __metadata("design:type", Number)
], OfficeDto.prototype, "openingHour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Время закрытия (24-часовой формат)',
        example: 18,
    }),
    __metadata("design:type", Number)
], OfficeDto.prototype, "closingHour", void 0);
//# sourceMappingURL=office.dto.js.map