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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(phone, pass) {
        const user = await this.usersService.findOneByPhone(phone);
        if (user) {
            const isPasswordMatch = await bcrypt.compare(pass, user.password);
            if (isPasswordMatch) {
                const payload = { id: user.id, email: user.email, phone: user.phone };
                return {
                    accessToken: await this.jwtService.signAsync(payload, {
                        expiresIn: '3h',
                    }),
                    id: user.id,
                    phone: user.phone,
                    fio: user.fio,
                    email: user.email,
                };
            }
        }
        throw new common_1.UnauthorizedException('Неправильные учетные данные');
    }
    async signInByPhone(phone) {
        const user = await this.usersService.findOneByPhone(phone);
        if (!user) {
            throw new common_1.UnauthorizedException('Пользователь с таким номером не найден');
        }
        const payload = { id: user.id, email: user.email, phone: user.phone };
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '3h',
            }),
            id: user.id,
            phone: user.phone,
            fio: user.fio,
            email: user.email,
        };
    }
    async signUp(payload) {
        const isValid = await this.usersService.verifyCode(payload.phone, payload.code);
        if (!isValid) {
            throw new common_1.BadRequestException('Неверный код верификации');
        }
        const user = await this.usersService.createUserAfterVerification(payload);
        return user;
    }
    async signUpStep1(phone) {
        const tgUser = await this.usersService.findOneByPhoneTG(phone);
        if (!tgUser) {
            throw new common_1.BadRequestException('Сначала активируйте Telegram бота');
        }
        await this.usersService.createVerificationCode(phone);
    }
    async signUpStep2(payload) {
        const isValid = await this.usersService.verifyCode(payload.phone, payload.code);
        if (!isValid) {
            throw new common_1.BadRequestException('Неверный код верификации');
        }
        const user = await this.usersService.createUserAfterVerification(payload);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map