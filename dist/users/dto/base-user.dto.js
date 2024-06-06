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
exports.LoginDto = exports.LoginResDto = exports.BaseUserRes = exports.BaseUserReq = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_valid_number_decorator_1 = require("../decorators/is-valid-number.decorator");
class BaseUserReq {
    email;
    phone;
    fio;
}
exports.BaseUserReq = BaseUserReq;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email пользователя',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], BaseUserReq.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Номер телефона пользователя',
        example: '+1234567890',
    }),
    __metadata("design:type", String)
], BaseUserReq.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Полное имя пользователя',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], BaseUserReq.prototype, "fio", void 0);
class BaseUserRes {
    id;
    email;
    phone;
    fio;
    createdAt;
    updatedAt;
}
exports.BaseUserRes = BaseUserRes;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор пользователя',
        required: false,
    }),
    __metadata("design:type", Number)
], BaseUserRes.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email пользователя',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], BaseUserRes.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Номер телефона пользователя',
        example: '+1234567890',
    }),
    __metadata("design:type", String)
], BaseUserRes.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Полное имя пользователя',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], BaseUserRes.prototype, "fio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата и время создания пользователя',
    }),
    __metadata("design:type", Date)
], BaseUserRes.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата и время последнего обновления пользователя',
    }),
    __metadata("design:type", Date)
], BaseUserRes.prototype, "updatedAt", void 0);
class LoginResDto {
    accessToken;
    id;
    fio;
    phone;
    email;
}
exports.LoginResDto = LoginResDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'accessToken',
    }),
    __metadata("design:type", String)
], LoginResDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user ID',
    }),
    __metadata("design:type", Number)
], LoginResDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user fio',
    }),
    __metadata("design:type", String)
], LoginResDto.prototype, "fio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user phone',
    }),
    __metadata("design:type", String)
], LoginResDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'user email',
    }),
    __metadata("design:type", String)
], LoginResDto.prototype, "email", void 0);
class LoginDto {
    phone;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User phone',
        example: '+7123456789',
    }),
    (0, class_validator_1.IsString)(),
    (0, is_valid_number_decorator_1.IsValidPhoneNumber)(['KG', 'KZ', 'RU']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'password123',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Пароль не может быть пустым' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
//# sourceMappingURL=base-user.dto.js.map