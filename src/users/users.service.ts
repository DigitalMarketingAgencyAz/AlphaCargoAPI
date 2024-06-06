import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, TGUsers, User } from '@prisma/client';
import { CreateUserResDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { addMinutes, isBefore } from 'date-fns';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';
import { TgbotService } from 'src/tgbot/tgbot.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private tgbot: TgbotService,
  ) {}

  async findOneByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  async findOneById(id: number): Promise<Omit<User, 'password'> | null> {
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
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
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

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
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

  async findOneByPhoneTG(phone: string): Promise<TGUsers | null> {
    const findPhone = phone.replace(/\D/g, '');
    return this.prisma.tGUsers.findUnique({
      where: {
        phone: findPhone,
      },
    });
  }

  async createVerificationCode(phone: string): Promise<void> {
    const existingCode = await this.prisma.verificationCode.findFirst({
      where: {
        phone,
        expiresAt: { gt: new Date() },
      },
    });

    if (existingCode) {
      throw new BadRequestException(
        'Код уже отправлен. Пожалуйста, подождите перед запросом нового кода.',
      );
    }

    const lastRequest = await this.prisma.verificationCode.findFirst({
      where: { phone },
      orderBy: { createdAt: 'desc' },
    });

    if (
      lastRequest &&
      isBefore(new Date(), addMinutes(lastRequest.createdAt, 1))
    ) {
      throw new BadRequestException(
        'Слишком частые запросы. Пожалуйста, подождите немного перед повторным запросом.',
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = addMinutes(new Date(), 5);

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

  async sendVerificationCode(chat_id: number, code: string): Promise<void> {
    // Логика отправки кода через Telegram-бота
    console.log(`Send verification code ${code} to chat_id ${chat_id}`);
    this.tgbot.sendVerificationCode(chat_id, code);
  }

  async verifyCode(phone: string, code: string): Promise<boolean> {
    const verification = await this.prisma.verificationCode.findFirst({
      where: { phone, code },
    });

    if (!verification) {
      throw new BadRequestException('Неверный код верификации');
    }

    if (isBefore(new Date(), verification.expiresAt)) {
      await this.prisma.verificationCode.delete({
        where: { id: verification.id },
      });
      return true;
    } else {
      throw new BadRequestException('Код верификации истек');
    }
  }

  async createUserAfterVerification(
    createUserDto: Prisma.UserCreateInput,
  ): Promise<CreateUserResDto> {
    const existingUserByEmail = await this.findOneByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const existingUserByPhone = await this.findOneByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      throw new ConflictException(
        'Пользователь с таким мобильным номером уже существует',
      );
    }

    const findPhone = createUserDto.phone.replace(/\D/g, '');

    const tgUser = await this.prisma.tGUsers.findFirst({
      where: { phone: findPhone },
    });

    if (!tgUser) {
      throw new BadRequestException('Сначала активируйте Telegram бота');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
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

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
