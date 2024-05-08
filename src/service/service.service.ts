import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Сервис для работы с Prisma
import { Service } from '@prisma/client'; // Импорт модели Service из Prisma

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  // Получить все услуги
  async getAllServices(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  // Получить услугу по ID
  async getServiceById(id: number): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Услуга с ID ${id} не найдена`);
    }

    return service;
  }
}
