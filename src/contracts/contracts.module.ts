import { Module } from '@nestjs/common';
import { ContractService } from './contracts.service';
import { ContractController } from './contracts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ContractService, PrismaService],
  controllers: [ContractController],
})
export class ContractsModule {}
