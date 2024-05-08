import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Сервис для работы с Prisma
import { CreateFranchiseDto } from './dto/create-franchise.dto'; // DTO для франшизы

@Injectable()
export class FranchiseService {
  constructor(private readonly prisma: PrismaService) {}

  private validateAndConvertDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        "Неправильный формат даты, ожидалось 'YYYY-MM-DD'",
      );
    }
    return date.toISOString(); // Преобразование в ISO 8601
  }

  async create(createFranchiseDto: CreateFranchiseDto) {
    const birthDate = this.validateAndConvertDate(createFranchiseDto.birthDate);
    console.log(birthDate);
    return this.prisma.franchise.create({
      data: {
        region: createFranchiseDto.region,
        city: createFranchiseDto.city,
        address: createFranchiseDto.address,
        fio: createFranchiseDto.fio,
        birthDate,
        phone: createFranchiseDto.phone,
        email: createFranchiseDto.email,
        sourceInfo: createFranchiseDto.sourceInfo, // Включаем опциональное поле
      },
    });
  }
}
