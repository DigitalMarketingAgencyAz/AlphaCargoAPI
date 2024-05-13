import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Calculator } from '@prisma/client';

@Injectable()
export class CalculatorService {
  constructor(private prisma: PrismaService) {}

  async findByCityId(cityId: number): Promise<Calculator | null> {
    const calculators = await this.prisma.calculator.findFirst({
      where: { cityId },
    });
    if (!calculators) {
      throw new NotFoundException();
    }
    return calculators;
  }
}
