import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service'; // Импорт сервиса
import { ServiceDto } from './dto/service.dto'; // Импорт DTO
import { Public } from 'src/auth/public-strategy';

@ApiTags('service')
@Controller('services')
@Public()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get() // Маршрут для получения всех услуг
  @ApiOperation({ summary: 'Получить все услуги' })
  @ApiResponse({
    status: 200,
    description: 'Список всех услуг',
    type: [ServiceDto],
  }) // Ожидаемый тип ответа
  async getAllServices(): Promise<ServiceDto[]> {
    return this.serviceService.getAllServices(); // Метод сервиса для получения всех услуг
  }

  @Get(':id') // Маршрут для получения услуги по ID
  @ApiOperation({ summary: 'Получить услугу по ID' })
  @ApiResponse({
    status: 200,
    description: 'Услуга по заданному ID',
    type: ServiceDto,
  })
  @ApiResponse({ status: 404, description: 'Услуга не найдена' })
  async getServiceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceDto> {
    return this.serviceService.getServiceById(id); // Метод сервиса для получения услуги по ID
  }
}
