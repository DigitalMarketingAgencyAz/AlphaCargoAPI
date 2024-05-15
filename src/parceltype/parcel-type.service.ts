import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParcelTypeDto } from './dto/parcel-type.dto';

@Injectable()
export class ParcelTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ParcelTypeDto[]> {
    return await this.prisma.parcelType.findMany();
  }
}
