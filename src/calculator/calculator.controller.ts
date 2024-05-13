import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalculatorService } from './calculator.service';
import { BaseCalculatorDto } from './dto/base-calculator.dto';
import { Public } from 'src/auth/public-strategy';

@ApiTags('calculator')
@Controller('calculator')
@Public()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('city/:cityId')
  @ApiOperation({ summary: 'Get calculator entries by cityId' })
  @ApiResponse({
    status: 200,
    description: 'List of calculator entries for the specified city',
    type: [BaseCalculatorDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No calculator entries found for the specified cityId',
  })
  findByCityId(
    @Param('cityId', ParseIntPipe) cityId: number,
  ): Promise<BaseCalculatorDto> {
    return this.calculatorService.findByCityId(cityId);
  }
}
