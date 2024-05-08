import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReqDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(pass, user?.password);
      if (isPasswordMatch) {
        const payload = { id: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload, {
            expiresIn: '3h',
          }),
          id: user.id,
          phone: user.phone,
          fio: user.fio,
        };
      }
    }
    throw new UnauthorizedException('Неправильные учетные данные');
  }
  async signUp(payload: CreateUserReqDto) {
    const user = await this.usersService.create(payload);
    return user;
  }
}
