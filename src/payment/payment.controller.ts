import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
  Res,
  ParseFilePipe,
  FileTypeValidator,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public-strategy';
import { unlink } from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

@ApiTags('payment')
@Controller('payment')
@Public()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('checkFile'))
  @ApiBody({
    description: 'Создать платёж',
    type: CreatePaymentDto,
  })
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createPaymentDto: CreatePaymentDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg|image/png',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('Файл чека обязателен');
    }

    createPaymentDto.checkFile = file.path;
    const user = await this.paymentService.findUserByPhone(
      createPaymentDto.phoneNumber,
    );

    if (!user) {
      await unlinkAsync(file.path);
      throw new BadRequestException(
        'Пользователь с указанным номером телефона не найден',
      );
    }

    createPaymentDto.userId = user.id;

    const result = await this.paymentService.create(createPaymentDto);
    return res.status(HttpStatus.CREATED).json(result);
  }
}
