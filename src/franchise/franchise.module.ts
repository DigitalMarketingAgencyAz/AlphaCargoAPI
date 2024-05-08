import { Module } from '@nestjs/common';
import { FranchiseService } from './franchise.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FranchiseController } from './franchise.controller';

@Module({
  controllers: [FranchiseController],
  providers: [FranchiseService, PrismaService],
})
export class FranchiseModule {}
