import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
// import { ParcelsController } from './parcels.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ParcelsService, PrismaService],
  // controllers: [ParcelsController],
})
export class ParcelModule {}
