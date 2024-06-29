import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Сумма платежа',
    example: 100.0,
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Файл чека',
    type: 'string',
    format: 'binary',
  })
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Файл платежа',
  })
  @IsOptional()
  @IsString()
  checkFile: string;

  userId: number;
}
