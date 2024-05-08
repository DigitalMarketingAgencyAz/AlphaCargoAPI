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
exports.ServiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ServiceDto {
    id;
    header_title;
    header_body;
    description;
    imagePath;
}
exports.ServiceDto = ServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID сервиса', example: 1 }),
    __metadata("design:type", Number)
], ServiceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Заголовок услуги',
    }),
    __metadata("design:type", String)
], ServiceDto.prototype, "header_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Описание сервиса',
    }),
    __metadata("design:type", String)
], ServiceDto.prototype, "header_body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Подробное описание',
    }),
    __metadata("design:type", String)
], ServiceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Путь к изображению',
        nullable: true,
    }),
    __metadata("design:type", String)
], ServiceDto.prototype, "imagePath", void 0);
//# sourceMappingURL=service.dto.js.map