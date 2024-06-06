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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const date_fns_1 = require("date-fns");
const tgbot_service_1 = require("../tgbot/tgbot.service");
let UsersService = class UsersService {
    prisma;
    tgbot;
    constructor(prisma, tgbot) {
        this.prisma = prisma;
        this.tgbot = tgbot;
    }
    async findOneByPhone(phone) {
        return this.prisma.user.findUnique({
            where: {
                phone,
            },
        });
    }
    async findOneById(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                phone: true,
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
    async update(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        if (updateUserDto.password) {
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
            updateUserDto.password = hashedPassword;
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { ...updateUserDto },
            select: {
                id: true,
                email: true,
                phone: true,
                fio: true,
            },
        });
        return updatedUser;
    }
    async findOneByPhoneTG(phone) {
        const findPhone = phone.replace(/\D/g, '');
        return this.prisma.tGUsers.findUnique({
            where: {
                phone: findPhone,
            },
        });
    }
    async createVerificationCode(phone) {
        const existingCode = await this.prisma.verificationCode.findFirst({
            where: {
                phone,
                expiresAt: { gt: new Date() },
            },
        });
        if (existingCode) {
            throw new common_1.BadRequestException('Код уже отправлен. Пожалуйста, подождите перед запросом нового кода.');
        }
        const lastRequest = await this.prisma.verificationCode.findFirst({
            where: { phone },
            orderBy: { createdAt: 'desc' },
        });
        if (lastRequest &&
            (0, date_fns_1.isBefore)(new Date(), (0, date_fns_1.addMinutes)(lastRequest.createdAt, 1))) {
            throw new common_1.BadRequestException('Слишком частые запросы. Пожалуйста, подождите немного перед повторным запросом.');
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = (0, date_fns_1.addMinutes)(new Date(), 5);
        await this.prisma.verificationCode.create({
            data: { phone, code, expiresAt, createdAt: new Date() },
        });
        const findPhone = phone.replace(/\D/g, '');
        const tgUser = await this.prisma.tGUsers.findFirst({
            where: { phone: findPhone },
        });
        console.log(tgUser, findPhone, 'line134');
        if (tgUser) {
            await this.sendVerificationCode(tgUser.chat_id, code);
        }
    }
    async sendVerificationCode(chat_id, code) {
        console.log(`Send verification code ${code} to chat_id ${chat_id}`);
        this.tgbot.sendVerificationCode(chat_id, code);
    }
    async verifyCode(phone, code) {
        const verification = await this.prisma.verificationCode.findFirst({
            where: { phone, code },
        });
        if (!verification) {
            throw new common_1.BadRequestException('Неверный код верификации');
        }
        if ((0, date_fns_1.isBefore)(new Date(), verification.expiresAt)) {
            await this.prisma.verificationCode.delete({
                where: { id: verification.id },
            });
            return true;
        }
        else {
            throw new common_1.BadRequestException('Код верификации истек');
        }
    }
    async createUserAfterVerification(createUserDto) {
        const existingUserByEmail = await this.findOneByEmail(createUserDto.email);
        if (existingUserByEmail) {
            throw new common_1.ConflictException('Пользователь с таким email уже существует');
        }
        const existingUserByPhone = await this.findOneByPhone(createUserDto.phone);
        if (existingUserByPhone) {
            throw new common_1.ConflictException('Пользователь с таким мобильным номером уже существует');
        }
        const findPhone = createUserDto.phone.replace(/\D/g, '');
        const tgUser = await this.prisma.tGUsers.findFirst({
            where: { phone: findPhone },
        });
        if (!tgUser) {
            throw new common_1.BadRequestException('Сначала активируйте Telegram бота');
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        const createUserWithoutCode = createUserDto;
        delete createUserWithoutCode['code'];
        const createdUser = await this.prisma.user.create({
            data: {
                ...createUserWithoutCode,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                phone: true,
            },
        });
        await this.prisma.tGUsers.update({
            where: { phone: findPhone },
            data: { userId: createdUser.id },
        });
        return createdUser;
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tgbot_service_1.TgbotService])
], UsersService);
//# sourceMappingURL=users.service.js.map