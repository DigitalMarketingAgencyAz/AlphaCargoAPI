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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const date_fns_1 = require("date-fns");
const axios_1 = __importDefault(require("axios"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVerificationCode(phone) {
        const lastRequest = await this.findLastVerificationRequest(phone);
        if (lastRequest &&
            (0, date_fns_1.isBefore)(new Date(), (0, date_fns_1.addMinutes)(lastRequest.createdAt, 3))) {
            throw new common_1.BadRequestException('Слишком частые запросы. Пожалуйста, подождите 3 минуты перед повторной отправкой кода.');
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = (0, date_fns_1.addMinutes)(new Date(), 5);
        await this.prisma.verificationCode.create({
            data: { phone, code, expiresAt, createdAt: new Date() },
        });
        await this.sendSmsVerification(phone, code);
    }
    async sendSmsVerification(phone, code) {
        const login = 'TheErl';
        const password = 'Erlan70ka1';
        const transactionId = `U4B4m1za${Math.random().toString(36).substr(2, 12)}`;
        const sender = 'SMSPRO.KG';
        const text = `Ваш код для регистрации: ${code}`;
        const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <message>
      <login>${login}</login>
      <pwd>${password}</pwd>
      <id>${transactionId}</id>
      <sender>${sender}</sender>
      <text>${text}</text>
      <phones>
        <phone>${phone}</phone>
      </phones>
    </message>`;
        const url = 'https://smspro.nikita.kg/api/message';
        const headers = { 'Content-Type': 'application/xml' };
        try {
            const response = await axios_1.default.post(url, xmlData, { headers });
            if (response.status !== 200) {
                throw new common_1.BadRequestException('Ошибка при отправке СМС');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Произошла ошибка при отправке СМС');
        }
    }
    async findLastVerificationRequest(phone) {
        return this.prisma.verificationCode.findFirst({
            where: { phone },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOneByPhone(phone) {
        return this.prisma.user.findUnique({
            where: { phone },
        });
    }
    async update(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        const data = { ...updateUserDto };
        if (updateUserDto.password) {
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
            data.password = hashedPassword;
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                phone: true,
                email: true,
                fio: true,
            },
        });
        return updatedUser;
    }
    async findOneById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                phone: true,
                email: true,
                fio: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async verifyCode(phone, code) {
        const verification = await this.prisma.verificationCode.findFirst({
            where: { phone, code },
        });
        if (!verification) {
            throw new common_1.BadRequestException('Неверный код верификации');
        }
        if (new Date() > verification.expiresAt) {
            throw new common_1.BadRequestException('Код верификации истек');
        }
        return true;
    }
    async createUserAfterVerification(createUserDto) {
        const existingUserByPhone = await this.findOneByPhone(createUserDto.phone);
        if (existingUserByPhone) {
            throw new common_1.ConflictException('Пользователь с таким мобильным номером уже существует');
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        const createdUser = await this.prisma.user.create({
            data: {
                phone: createUserDto.phone,
                password: hashedPassword,
            },
            select: {
                id: true,
                phone: true,
            },
        });
        return createdUser;
    }
    async deleteVerificationCode(phone, code) {
        await this.prisma.verificationCode.deleteMany({
            where: { phone, code },
        });
    }
    async deactivateUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { isActive: false },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map