import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParcelTypeService } from './parcel-type.service';
import { ParcelTypeDto } from './dto/parcel-type.dto';
import { Public } from 'src/auth/public-strategy';

@ApiTags('parcel-type')
@Controller('parcel-type')
@Public()
export class ParcelTypeController {
  constructor(private readonly parcelTypeService: ParcelTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all parcel types' })
  @ApiResponse({
    status: 200,
    description: 'List of all parcel types',
    type: [ParcelTypeDto],
  })
  async findAll(): Promise<ParcelTypeDto[]> {
    return this.parcelTypeService.findAll();
  }
}
