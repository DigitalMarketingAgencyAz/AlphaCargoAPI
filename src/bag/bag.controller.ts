import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BagService } from './bag.service';
import { Bag } from '@prisma/client';
import { Public } from 'src/auth/public-strategy';

@ApiTags('bags')
@Controller('bags')
@Public()
export class BagController {
  constructor(private readonly bagService: BagService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bags' })
  @ApiResponse({
    status: 200,
    description: 'List of all bags',
  })
  async findAll(): Promise<Bag[]> {
    return this.bagService.findAll();
  }
}
