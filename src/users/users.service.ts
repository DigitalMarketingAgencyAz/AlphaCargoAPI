import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { addMinutes, isBefore } from 'date-fns';
import axios from 'axios';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Создание верификационного кода с проверкой частоты запросов
  async createVerificationCode(phone: string): Promise<void> {
    // Найти последний запрос для этого номера
    const lastRequest = await this.findLastVerificationRequest(phone);

    // Проверить, прошло ли 3 минуты с момента последнего запроса
    if (
      lastRequest &&
      isBefore(new Date(), addMinutes(lastRequest.createdAt, 3))
    ) {
      throw new BadRequestException(
        'Слишком частые запросы. Пожалуйста, подождите 3 минуты перед повторной отправкой кода.',
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Генерация 6-значного кода
    const expiresAt = addMinutes(new Date(), 5); // Код действителен в течение 5 минут

    await this.prisma.verificationCode.create({
      data: { phone, code, expiresAt, createdAt: new Date() },
    });

    // Отправка кода через SMS
    await this.sendSmsVerification(phone, code);
  }

  // Отправка СМС с верификационным кодом
  async sendSmsVerification(phone: string, code: string): Promise<void> {
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
      const response = await axios.post(url, xmlData, { headers });
      if (response.status !== 200) {
        throw new BadRequestException('Ошибка при отправке СМС');
      }
    } catch (error) {
      throw new BadRequestException('Произошла ошибка при отправке СМС');
    }
  }

  // Найти последний запрос на отправку верификационного кода
  async findLastVerificationRequest(phone: string): Promise<any> {
    return this.prisma.verificationCode.findFirst({
      where: { phone },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
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

  async findOneById(id: number): Promise<Omit<User, 'password' | 'isActive'>> {
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
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async verifyCode(phone: string, code: string): Promise<boolean> {
    const verification = await this.prisma.verificationCode.findFirst({
      where: { phone, code },
    });

    if (!verification) {
      throw new BadRequestException('Неверный код верификации');
    }

    if (new Date() > verification.expiresAt) {
      throw new BadRequestException('Код верификации истек');
    }

    return true;
  }

  async createUserAfterVerification(createUserDto: {
    phone: string;
    password: string;
  }): Promise<{ id: number; phone: string }> {
    const existingUserByPhone = await this.findOneByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      throw new ConflictException(
        'Пользователь с таким мобильным номером уже существует',
      );
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

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

  async deleteVerificationCode(phone: string, code: string): Promise<void> {
    await this.prisma.verificationCode.deleteMany({
      where: { phone, code },
    });
  }

  async deactivateUser(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
  }
}
