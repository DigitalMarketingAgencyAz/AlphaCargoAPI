import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';

@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}

  async create(createResumeDto: CreateResumeDto) {
    return this.prisma.resume.create({
      data: createResumeDto,
    });
  }
}
