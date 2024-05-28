import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserResDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserReqDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserParcels(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findOneById(id: number): Promise<Omit<User, 'password'> | null> {
    const user = this.prisma.user.findUnique({
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

  async findOneByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async update(
    id: number,
    updateUserDto: UpdateUserReqDto,
  ): Promise<CreateUserResDto> {
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

  async create(
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

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword, // здесь добавляем хешированный пароль
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });
    return createdUser;
  }
}
