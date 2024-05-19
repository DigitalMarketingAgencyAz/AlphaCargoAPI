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
exports.GetParcelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetParcelDto {
    date;
    invoice;
    sender;
    recipient;
    city;
    weight;
    quantity;
    shipment_date;
    status;
}
exports.GetParcelDto = GetParcelDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-05-20T02:17:09Z',
        description: 'Дата создания',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'INV20240520021709',
        description: 'Номер счета-фактуры',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "invoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Иванов Иван Иванович', description: 'Отправитель' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Петров Петр Петрович', description: 'Получатель' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Санкт-Петербург', description: 'Город' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '150', description: 'Вес' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Количество' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetParcelDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-05-20T22:54:44Z',
        description: 'Дата отправки',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "shipment_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Груз прибыл в Санкт-Петербург',
        description: 'Статус',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetParcelDto.prototype, "status", void 0);
//# sourceMappingURL=base-parcel-dto.js.map