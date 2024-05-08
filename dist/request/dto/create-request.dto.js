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
exports.CreateRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_valid_number_decorator_1 = require("../../users/decorators/is-valid-number.decorator");
class CreateRequestDto {
    fullName;
    phoneNumber;
    pickupAddress;
    pickupTime;
    packageSize;
    packageCount;
    deliveryAddress;
}
exports.CreateRequestDto = CreateRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Иван Иванов',
        description: 'ФИО отправителя',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+71234567890',
        description: 'Номер телефона отправителя',
    }),
    (0, is_valid_number_decorator_1.IsValidPhoneNumber)(['KG', 'KZ', 'RU']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Москва, Красная площадь, 1',
        description: 'Адрес, откуда нужно забрать посылку',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-10-10 14:00:00',
        description: 'Дата и время забора посылки',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "pickupTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Средний размер',
        description: 'Размер посылки',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "packageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Количество посылок',
    }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRequestDto.prototype, "packageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Санкт-Петербург, Невский проспект, 22',
        description: 'Адрес доставки посылки',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "deliveryAddress", void 0);
//# sourceMappingURL=create-request.dto.js.map