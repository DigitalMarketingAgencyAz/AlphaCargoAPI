import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TariffService } from './tariffs.service';
import { TariffDto } from './dto/tariff.dto';
import { Public } from 'src/auth/public-strategy';
import { Tariff } from '@prisma/client';

@Public()
@Controller('tariffs')
@ApiTags('tariffs')
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все тарифы' })
  @ApiResponse({
    status: 200,
    description: 'Список всех тарифов',
    type: [TariffDto],
  })
  async getAllTariffs(): Promise<Tariff[]> {
    return this.tariffService.findAll();
  }
}
