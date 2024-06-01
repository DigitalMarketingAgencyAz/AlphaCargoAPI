import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { GetParcelDto } from './dto/base-parcel-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetParcelStatusDto } from './dto/base-parcel-status.dto';
import { Public } from 'src/auth/public-strategy';

@ApiTags('parcels')
@Controller('parcels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Public()
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все посылки пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Список всех посылок',
    type: [GetParcelDto],
  })
  async findAll(@Req() request): Promise<GetParcelDto[]> {
    const phoneNumber = request.user.phone;
    return await this.parcelsService.findAll(phoneNumber);
  }

  @Get('/invoice/:invoiceNumber')
  @ApiOperation({ summary: 'Получить историю посылки по invoiceNumber' })
  @ApiResponse({
    status: 200,
    description: 'Посылка найдена.',
    type: GetParcelDto,
  })
  async findOne(
    @Param('invoiceNumber') invoiceNumber: string,
  ): Promise<GetParcelStatusDto> {
    return this.parcelsService.findOneByInvoiceNumber(invoiceNumber);
  }

  @Get('/invoice/:invoiceNumber/pdf')
  @ApiOperation({ summary: 'Получить PDF файл по invoiceNumber' })
  @ApiResponse({
    status: 200,
    description: 'PDF файл посылки',
    content: { 'application/pdf': {} },
  })
  async getInvoicePdf(@Param('invoiceNumber') invoiceNumber: string) {
    const pdfBuffer = await this.parcelsService.getInvoicePdf(invoiceNumber);
    if (!pdfBuffer) {
      throw new NotFoundException('PDF не найден');
    }
    return pdfBuffer;
  }
}
