import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Импортируем ваш сервис Prisma
import { GetParcelDto } from './dto/base-parcel-dto';

@Injectable()
export class ParcelsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GetParcelDto[]> {
    return this.prisma.parcel.findMany();
  }

  async findOne(id: number): Promise<GetParcelDto | null> {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id },
    });
    console.log(parcel);
    if (!parcel) {
      throw new NotFoundException('Посылки с таким id не существует');
    }
    return parcel;
  }

  async findByTrackingNumber(trackingNumber: string): Promise<GetParcelDto> {
    const parcel = await this.prisma.parcel.findUnique({
      where: { trackingNumber },
    });
    if (!parcel) {
      throw new NotFoundException('Посылки с таким трек номером не существует');
    }
    return parcel;
  }
}
