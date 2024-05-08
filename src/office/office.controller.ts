import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfficeService } from './office.service'; // Сервис для работы с офисами
import { OfficeDto } from './dto/office.dto'; // DTO для отображения офиса
import { Public } from 'src/auth/public-strategy';

@Public()
@Controller('offices')
@ApiTags('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все офисы' })
  @ApiResponse({
    status: 200,
    description: 'Список всех офисов',
    type: [OfficeDto],
  })
  async getAllOffices(): Promise<OfficeDto[]> {
    return this.officeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить офис по ID' })
  @ApiResponse({
    status: 200,
    description: 'Офис по заданному ID',
    type: OfficeDto,
  })
  @ApiResponse({ status: 404, description: 'Офис не найден' })
  async getOfficeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OfficeDto> {
    const office = await this.officeService.findOneById(id);
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
    return office;
  }
}
