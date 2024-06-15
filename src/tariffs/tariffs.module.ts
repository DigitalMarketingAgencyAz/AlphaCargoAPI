import { Module } from '@nestjs/common';
import { TariffService } from './tariffs.service';
import { TariffController } from './tariffs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TariffService, PrismaService],
  controllers: [TariffController],
})
export class TariffsModule {}
