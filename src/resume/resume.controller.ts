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
import { validate } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public-strategy';
import { unlink } from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

@ApiTags('resume')
@Controller('resume')
@Public()
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resumeFile'))
  @ApiBody({
    description: 'Create Resume',
    type: CreateResumeDto,
  })
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createResumeDto: CreateResumeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              'application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('Resume file is required');
    }

    createResumeDto.resumeFile = file.path;
    const errors = await validate(createResumeDto);
    if (errors.length > 0) {
      await unlinkAsync(file.path); // Удаляем файл, если валидация данных не прошла
      throw new BadRequestException(
        errors.map((error) => Object.values(error.constraints)).join(', '),
      );
    }

    const result = await this.resumeService.create(createResumeDto);
    return res.status(HttpStatus.CREATED).json(result);
  }
}
