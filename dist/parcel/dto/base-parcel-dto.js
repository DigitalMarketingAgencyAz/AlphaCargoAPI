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
class GetParcelDto {
    id;
    sender;
    recipient;
    status;
    sendDate;
    receiveDate;
    invoiceNumber;
    deliveryCost;
    trackingNumber;
    weight;
    dimensions;
    contentDescription;
}
exports.GetParcelDto = GetParcelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Уникальный идентификатор посылки' }),
    __metadata("design:type", Number)
], GetParcelDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Имя отправителя' }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Smith', description: 'Имя получателя' }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'In Transit', description: 'Статус посылки' }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-05-01T14:00:00Z',
        description: 'Дата отправки',
    }),
    __metadata("design:type", Date)
], GetParcelDto.prototype, "sendDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-05-10T14:00:00Z',
        description: 'Дата получения',
        required: false,
    }),
    __metadata("design:type", Date)
], GetParcelDto.prototype, "receiveDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INV123456', description: 'Номер накладной' }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "invoiceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50.5, description: 'Стоимость доставки' }),
    __metadata("design:type", Number)
], GetParcelDto.prototype, "deliveryCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TR1234567890', description: 'Трекномер посылки' }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "trackingNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10.5,
        description: 'Вес посылки (кг)',
        required: false,
    }),
    __metadata("design:type", Number)
], GetParcelDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '30x20x15 cm',
        description: 'Размеры посылки',
        required: false,
    }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "dimensions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Электроника',
        description: 'Описание содержимого посылки',
        required: false,
    }),
    __metadata("design:type", String)
], GetParcelDto.prototype, "contentDescription", void 0);
//# sourceMappingURL=base-parcel-dto.js.map