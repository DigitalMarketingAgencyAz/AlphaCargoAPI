import { Body, Controller, Post } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestService } from './request.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public-strategy';

@ApiTags('request')
@Controller('request')
@Public()
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post()
  createRequest(@Body() createRequestDto: CreateRequestDto) {
    console.log(createRequestDto);
    return this.requestService.createRequest(createRequestDto);
  }
}
