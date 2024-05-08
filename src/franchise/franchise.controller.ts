import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FranchiseService } from './franchise.service'; // Сервис для франшиз
import { CreateFranchiseDto } from './dto/create-franchise.dto'; // DTO для создания франшизы
import { Public } from 'src/auth/public-strategy';

@Controller('franchise')
@ApiTags('franchise')
@Public()
export class FranchiseController {
  constructor(private readonly franchiseService: FranchiseService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую франшизу' })
  @ApiResponse({ status: 201, description: 'Франшиза успешно создана' })
  async createFranchise(@Body() createFranchiseDto: CreateFranchiseDto) {
    return this.franchiseService.create(createFranchiseDto);
  }
}
