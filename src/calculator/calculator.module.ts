import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CalculatorController],
  providers: [CalculatorService, PrismaService],
})
export class CalculatorModule {}
