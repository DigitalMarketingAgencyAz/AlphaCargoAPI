import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { City } from '@prisma/client';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<City[]> {
    return this.prisma.city.findMany();
  }

  async findOneById(id: number): Promise<City | null> {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      throw new NotFoundException('Город не найден');
    }

    return city;
  }
}
