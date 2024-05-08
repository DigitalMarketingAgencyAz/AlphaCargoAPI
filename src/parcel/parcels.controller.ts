import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { GetParcelDto } from './dto/base-parcel-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('parcels')
@Controller('parcels')
@ApiBearerAuth()
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Список всех посылок',
    type: [GetParcelDto],
  })
  async findAll(): Promise<GetParcelDto[]> {
    return this.parcelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить посылку по ID' })
  @ApiResponse({
    status: 200,
    description: 'Посылка найдена.',
    type: GetParcelDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parcelsService.findOne(+id);
  }

  @Get('tracking/:trackingNumber')
  @ApiOperation({ summary: 'Найти посылку по трек-номеру' })
  @ApiResponse({
    status: 200,
    description: 'Посылка найдена.',
    type: GetParcelDto,
  })
  findByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {
    return this.parcelsService.findByTrackingNumber(trackingNumber);
  }
}
