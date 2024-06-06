"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const base_user_dto_1 = require("../users/dto/base-user.dto");
const public_strategy_1 = require("./public-strategy");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const users_service_1 = require("../users/users.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthController = class AuthController {
    authService;
    usersService;
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async loginStep1(loginDto) {
        const user = await this.usersService.findOneByPhone(loginDto.phone);
        if (!user) {
            throw new common_1.BadRequestException('Пользователь с таким номером не найден');
        }
        const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Неправильные учетные данные');
        }
        await this.usersService.createVerificationCode(loginDto.phone);
    }
    async loginStep2(loginDto) {
        const isValid = await this.usersService.verifyCode(loginDto.phone, loginDto.code);
        if (!isValid) {
            throw new common_1.BadRequestException('Неверный код верификации');
        }
        return this.authService.signIn(loginDto.phone, loginDto.password);
    }
    async signUpStep1(signUpDto) {
        const tgUser = await this.usersService.findOneByPhoneTG(signUpDto.phone);
        if (!tgUser) {
            throw new common_1.BadRequestException('Сначала активируйте Telegram бота');
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
    (0, common_1.Post)('login-step1'),
    (0, swagger_1.ApiOperation)({ summary: 'User Login Step 1: Request Verification Code' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Verification code sent',
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
], AuthController.prototype, "loginStep1", null);
__decorate([
    (0, public_strategy_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login-step2'),
    (0, swagger_1.ApiOperation)({
        summary: 'User Login Step 2: Verify Code and Sign In',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User logged in',
        type: base_user_dto_1.LoginResDto,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                phone: { type: 'string' },
                code: { type: 'string' },
                password: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginStep2", null);
__decorate([
    (0, public_strategy_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('signup-step1'),
    (0, swagger_1.ApiOperation)({ summary: 'User Signup Step 1: Request Verification Code' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Verification code sent',
    }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserReqDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserReqDto]),
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
                email: { type: 'string' },
                password: { type: 'string' },
                fio: { type: 'string' },
                phone: { type: 'string' },
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