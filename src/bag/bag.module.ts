import { Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagController } from './bag.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BagController],
  providers: [BagService, PrismaService],
})
export class BagModule {}
