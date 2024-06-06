import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReqDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginResDto } from '../users/dto/base-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(phone: string, pass: string): Promise<LoginResDto> {
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
    throw new UnauthorizedException('Неправильные учетные данные');
  }

  async signInByPhone(phone: string): Promise<LoginResDto> {
    const user = await this.usersService.findOneByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Пользователь с таким номером не найден');
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

  async signUp(payload: CreateUserReqDto & { code: string }) {
    const isValid = await this.usersService.verifyCode(
      payload.phone,
      payload.code,
    );
    if (!isValid) {
      throw new BadRequestException('Неверный код верификации');
    }

    const user = await this.usersService.createUserAfterVerification(payload);
    return user;
  }

  async signUpStep1(phone: string) {
    const tgUser = await this.usersService.findOneByPhoneTG(phone);
    if (!tgUser) {
      throw new BadRequestException('Сначала активируйте Telegram бота');
    }

    await this.usersService.createVerificationCode(phone);
  }

  async signUpStep2(payload: CreateUserReqDto & { code: string }) {
    const isValid = await this.usersService.verifyCode(
      payload.phone,
      payload.code,
    );
    if (!isValid) {
      throw new BadRequestException('Неверный код верификации');
    }

    const user = await this.usersService.createUserAfterVerification(payload);
    return user;
  }
}
