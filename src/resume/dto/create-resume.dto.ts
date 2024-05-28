import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidPhoneNumber } from '../../users/decorators/is-valid-number.decorator';
import { Transform } from 'class-transformer';

export class CreateResumeDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the applicant',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the applicant',
  })
  @IsString()
  @IsNotEmpty()
  @IsValidPhoneNumber(['KG', 'KZ', 'RU'])
  phoneNumber: string;

  @ApiProperty({
    example: 'Driver',
    description: 'Desired position',
  })
  @IsNotEmpty()
  @IsString()
  desiredPosition: string;

  @ApiProperty({ example: 60000, description: 'Desired salary' })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  desiredSalary: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Resume file' })
  @IsOptional()
  @IsString()
  resumeFile: string;
}
