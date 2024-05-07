import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CitiesService } from './city.service';
import { CountriesService } from './country.service';
import { LocationController } from './location.controller';

@Module({
  controllers: [LocationController],
  providers: [CitiesService, CountriesService, PrismaService],
})
export class LocationModule {}
