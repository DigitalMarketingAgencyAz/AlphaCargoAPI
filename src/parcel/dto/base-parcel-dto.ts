import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString } from 'class-validator';

export class GetParcelDto {
  @ApiProperty({
    example: '2024-05-20T02:17:09Z',
    description: 'Дата создания',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 'INV20240520021709',
    description: 'Номер счета-фактуры',
  })
  @IsString()
  invoice: string;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'Отправитель' })
  @IsString()
  sender: string;

  @ApiProperty({ example: 'Петров Петр Петрович', description: 'Получатель' })
  @IsString()
  recipient: string;

  @ApiProperty({ example: 'Санкт-Петербург', description: 'Город' })
  @IsString()
  city: string;

  @ApiProperty({ example: '150', description: 'Вес' })
  @IsString()
  weight: string;

  @ApiProperty({ example: 3, description: 'Количество' })
  @IsInt()
  quantity: number;

  @ApiProperty({
    example: '2024-05-20T22:54:44Z',
    description: 'Дата отправки',
  })
  @IsDateString()
  shipment_date: string;

  @ApiProperty({
    example: 'Груз прибыл в Санкт-Петербург',
    description: 'Статус',
  })
  @IsString()
  status: string;
}
