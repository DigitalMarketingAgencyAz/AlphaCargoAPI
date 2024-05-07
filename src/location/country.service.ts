import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Country } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Country[]> {
    return this.prisma.country.findMany();
  }

  async findOneById(id: number): Promise<Country | null> {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      throw new NotFoundException('Страна не найдена');
    }

    return country;
  }
}
