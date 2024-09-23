import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResDto } from '../users/dto/base-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Логин с проверкой телефона и пароля
  async signIn(phone: string, pass: string): Promise<LoginResDto> {
    // Проверка на специальный тестовый аккаунт
    if (phone === '+996770244527') {
      const user = await this.usersService.findOneByPhone(phone);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      const isPasswordMatch = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Неправильные учетные данные');
      }

      // Генерация JWT токена
      const payload = { id: user.id, phone: user.phone };
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '3h',
        }),
        id: user.id,
        phone: user.phone,
        fio: user.fio || null,
        email: user.email || null,
      };
    }
    const user = await this.usersService.findOneByPhone(phone);

    if (!user) {
      throw new UnauthorizedException('Неправильные учетные данные');
    }

    // Проверка, активен ли аккаунт
    if (!user.isActive) {
      throw new UnauthorizedException('Ваш аккаунт не активен');
    }

    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Неправильные учетные данные');
    }

    // Генерация JWT токена
    const payload = { id: user.id, phone: user.phone };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30 days',
      }),
      id: user.id,
      phone: user.phone,
    };
  }

  // Регистрация с проверкой СМС-кода
  async signUp(payload: { phone: string; password: string; code: string }) {
    // Проверка на специальный тестовый аккаунт
    if (payload.phone === '+996770244527') {
      const existingUser = await this.usersService.findOneByPhone(
        payload.phone,
      );
      if (existingUser) {
        throw new ConflictException(
          'Пользователь с таким номером телефона уже существует',
        );
      }

      // Используем UsersService для создания пользователя
      const user = await this.usersService.createUserAfterVerification({
        phone: payload.phone,
        password: payload.password,
      });

      return user;
    }
    // Проверка кода верификации
    const isValid = await this.usersService.verifyCode(
      payload.phone,
      payload.code,
    );
    if (!isValid) {
      throw new BadRequestException('Неверный код верификации');
    }

    // Проверка на существующего пользователя
    const existingUser = await this.usersService.findOneByPhone(payload.phone);
    if (existingUser && !existingUser.isActive) {
      throw new UnauthorizedException('Ваш аккаунт не активен');
    }

    try {
      // Создание пользователя
      const user = await this.usersService.createUserAfterVerification({
        phone: payload.phone,
        password: payload.password,
      });
      // Удаление кода верификации после успешного создания пользователя
      await this.usersService.deleteVerificationCode(
        payload.phone,
        payload.code,
      );
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException('Ошибка при создании пользователя');
    }
  }
}
