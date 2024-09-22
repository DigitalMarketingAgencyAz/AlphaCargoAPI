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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const base_user_dto_1 = require("./dto/base-user.dto");
const auth_guard_1 = require("../auth/auth.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUser(request) {
        const userId = request.user.id;
        const user = await this.usersService.findOneById(userId);
        const userRes = {
            id: user.id,
            phone: user.phone,
            email: user.email || null,
            fio: user.fio || null,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        return userRes;
    }
    async updateUser(request, updateUserReqDto) {
        const userId = request.user.id;
        const updatedUser = await this.usersService.update(userId, updateUserReqDto);
        return updatedUser;
    }
    async deactivateUser(request) {
        const userId = request.user.id;
        await this.usersService.deactivateUser(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Получить информацию о пользователе' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Информация о пользователе получена',
        type: base_user_dto_1.BaseUserRes,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить информацию о пользователе' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserReqDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Информация о пользователе обновлена',
        type: update_user_dto_1.UpdateUserResDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('deactivateUser'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Деактивировать аккаунт пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Аккаунт пользователя деактивирован',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserController);
//# sourceMappingURL=users.controller.js.map