import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { Public } from 'src/auth/public-strategy';

@Controller('contract')
@ApiTags('contract')
@Public()
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый контракт' })
  @ApiResponse({ status: 201, description: 'Контракт успешно создан' })
  async createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }
}
