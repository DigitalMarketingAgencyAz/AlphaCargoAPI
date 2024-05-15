import { Module } from '@nestjs/common';
import { ParcelTypeController } from './parcel-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelTypeService } from './parcel-type.service';

@Module({
  controllers: [ParcelTypeController],
  providers: [ParcelTypeService, PrismaService],
})
export class ParcelTypeModule {}
