import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CalculateDto } from './dto/base-calculator.dto';

@Injectable()
export class CalculatorService {
  constructor(private prisma: PrismaService) {}

  async calculateTotalCost(calculateDto: CalculateDto): Promise<number> {
    const { cityFromId, cityToId, parcelTypeId, weight, countOfType, bagId } =
      calculateDto;

    const calculator = await this.prisma.calculator.findFirst({
      where: {
        cityFromId,
        cityToId,
        parcelTypeId,
      },
    });

    if (!calculator) {
      throw new NotFoundException(
        `No calculator entry found for cityFromId ${cityFromId}, cityToId ${cityToId}, and parcelTypeId ${parcelTypeId}`,
      );
    }

    const bag = await this.prisma.bag.findUnique({
      where: { id: bagId },
    });

    if (!bag) {
      throw new NotFoundException(`No bag entry found for bagId ${bagId}`);
    }

    const totalCost = countOfType * bag.price + weight * calculator.price;
    return totalCost;
  }
}
