import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Сервис для работы с Prisma
import { CreateRequestDto } from './dto/create-request.dto';
import { parse } from 'date-fns';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async createRequest(data: CreateRequestDto) {
    console.log(data);
    // const pickupTime = this.parseDateString(data.pickupTime);
    // data.pickupTime = pickupTime;
    return this.prisma.request.create({
      data,
    });
  }

  async getRequestById(id: number) {
    return this.prisma.request.findUnique({
      where: { id },
    });
  }

  private parseDateString(dateString: string): Date {
    // Пример формата: '2023-10-10 14:00:00'
    return parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
  }
}
