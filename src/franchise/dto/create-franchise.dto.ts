import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateFranchiseDto {
  @ApiProperty({ description: 'Регион', example: 'Сибирь' })
  @IsString()
  region: string;

  @ApiProperty({ description: 'Город', example: 'Новосибирск' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Адрес', example: 'Улица Пушкина, дом 10' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'ФИО', example: 'Иванов Иван Иванович' })
  @IsString()
  fio: string;

  @ApiProperty({ description: 'Дата рождения', example: '1990-01-01' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({ description: 'Контактный телефон', example: '+71234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Email', example: 'example@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Откуда вы о нас узнали',
    example: 'Реклама в интернете',
  })
  @IsOptional()
  @IsString()
  sourceInfo?: string; // Поле с возможностью быть пустым
}
