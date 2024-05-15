import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/base-calculator.dto';
import { Public } from 'src/auth/public-strategy';

@ApiTags('calculator')
@Controller('calculator')
@Public()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  @ApiBody({ type: CalculateDto })
  @ApiOperation({ summary: 'Calculate total cost' })
  @ApiResponse({
    status: 200,
    description: 'Calculated total cost',
  })
  @ApiResponse({
    status: 404,
    description: 'Data not found for the specified cityId or parcelTypeId',
  })
  async calculateTotalCost(
    @Body()
    calculateDto: CalculateDto,
  ): Promise<number> {
    return this.calculatorService.calculateTotalCost(calculateDto);
  }
}
