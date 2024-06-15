import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tariff } from '@prisma/client';

@Injectable()
export class TariffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Tariff[]> {
    return this.prisma.tariff.findMany();
  }
}
