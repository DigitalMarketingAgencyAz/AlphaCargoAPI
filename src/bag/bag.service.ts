import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BagDto } from './dto/base-bag.dto';

@Injectable()
export class BagService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BagDto[]> {
    return this.prisma.bag.findMany();
  }
}
