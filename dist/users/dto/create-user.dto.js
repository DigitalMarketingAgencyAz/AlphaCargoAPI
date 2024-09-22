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
exports.CreateUserReqDto = exports.CreateUserResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_valid_number_decorator_1 = require("../decorators/is-valid-number.decorator");
const passwordRegEx = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zА-Яа-яЁё\d@$!%*?&]+$/;
class CreateUserResDto {
    id;
    phone;
}
exports.CreateUserResDto = CreateUserResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Идентификатор пользователя' }),
    __metadata("design:type", Number)
], CreateUserResDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+1234567890',
        description: 'Номер телефона пользователя',
    }),
    __metadata("design:type", String)
], CreateUserResDto.prototype, "phone", void 0);
class CreateUserReqDto {
    password;
    phone;
    fio;
    email;
    code;
}
exports.CreateUserReqDto = CreateUserReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password123!',
        description: 'Пароль пользователя',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Пароль обязателен для заполнения.' }),
    (0, class_validator_1.MinLength)(8, { message: 'Минимальная длина пароля - 8 символов' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Максимальная длина пароля - 20 символов' }),
    (0, class_validator_1.Matches)(passwordRegEx, {
        message: 'Пароль должен содержать минимум одну заглавную и одну строчную букву, одну цифру и один специальный символ',
    }),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+1234567890',
        description: 'Номер телефона пользователя',
    }),
    (0, class_validator_1.IsString)(),
    (0, is_valid_number_decorator_1.IsValidPhoneNumber)(['KG', 'KZ', 'RU']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'John Doe',
        description: 'Полное имя пользователя',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "fio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'user@example.com',
        description: 'Email пользователя',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '123456',
        description: 'Код верификации',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserReqDto.prototype, "code", void 0);
//# sourceMappingURL=create-user.dto.js.map