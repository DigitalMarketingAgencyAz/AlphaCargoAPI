import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Contract } from '@prisma/client';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async createContract(data: CreateContractDto): Promise<Contract> {
    return this.prisma.contract.create({
      data,
    });
  }
}
