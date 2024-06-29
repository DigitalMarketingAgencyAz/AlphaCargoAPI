import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByPhone(phoneNumber: string) {
    // Очистка номера телефона от лишних символов
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    const user = await this.prisma.user.findFirst({
      where: {
        phone: {
          contains: cleanedPhoneNumber,
        },
      },
    });

    if (!user) {
      throw new BadRequestException(
        'Пользователь с указанным номером телефона не найден',
      );
    }

    return user;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.prisma.payment.create({
      data: {
        amount: createPaymentDto.amount,
        checkFile: createPaymentDto.checkFile,
        userId: createPaymentDto.userId,
      },
    });

    return payment;
  }
}
