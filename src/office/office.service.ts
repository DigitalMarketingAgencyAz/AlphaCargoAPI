import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Сервис Prisma
import { Office } from '@prisma/client'; // Модель Office из Prisma

@Injectable()
export class OfficeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Office[]> {
    return this.prisma.office.findMany({
      include: {
        city: true, // Жадное получение данных о городе
        country: true, // Жадное получение данных о стране
      },
    });
  }

  async findOneById(id: number): Promise<Office | null> {
    const office = await this.prisma.office.findUnique({
      where: { id },
      include: {
        city: true, // Жадное получение данных о городе
        country: true, // Жадное получение данных о стране
      },
    });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
    return office;
  }
}
