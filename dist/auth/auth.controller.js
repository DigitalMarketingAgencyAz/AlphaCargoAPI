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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const public_strategy_1 = require("./public-strategy");
const users_service_1 = require("../users/users.service");
const base_user_dto_1 = require("../users/dto/base-user.dto");
let AuthController = class AuthController {
    authService;
    usersService;
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(loginDto) {
        return this.authService.signIn(loginDto.phone, loginDto.password);
    }
    async signUpStep1(signUpDto) {
        const user = await this.usersService.findOneByPhone(signUpDto.phone);
        if (user) {
            throw new common_1.BadRequestException('Пользователь с таким номером телефона уже существует');
        }
        await this.usersService.createVerificationCode(signUpDto.phone);
    }
    async signUpStep2(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_strategy_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User Login' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully logged in',
        type: base_user_dto_1.LoginResDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                phone: { type: 'string' },
                password: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_strategy_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('signup-step1'),
    (0, swagger_1.ApiOperation)({ summary: 'User Signup Step 1: Request Verification Code' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Verification code sent',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                phone: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUpStep1", null);
__decorate([
    (0, public_strategy_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('signup-step2'),
    (0, swagger_1.ApiOperation)({
        summary: 'User Signup Step 2: Verify Code and Create Account',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User created',
        type: create_user_dto_1.CreateUserResDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                phone: { type: 'string' },
                password: { type: 'string' },
                code: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUpStep2", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map