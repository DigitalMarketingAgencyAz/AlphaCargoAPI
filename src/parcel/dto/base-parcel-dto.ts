import { ApiProperty } from '@nestjs/swagger';

export class GetParcelDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор посылки' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Имя отправителя' })
  sender: string;

  @ApiProperty({ example: 'Jane Smith', description: 'Имя получателя' })
  recipient: string;

  @ApiProperty({ example: 'In Transit', description: 'Статус посылки' })
  status: string;

  @ApiProperty({
    example: '2024-05-01T14:00:00Z',
    description: 'Дата отправки',
  })
  sendDate: Date;

  @ApiProperty({
    example: '2024-05-10T14:00:00Z',
    description: 'Дата получения',
    required: false,
  })
  receiveDate?: Date;

  @ApiProperty({ example: 'INV123456', description: 'Номер накладной' })
  invoiceNumber: string;

  @ApiProperty({ example: 50.5, description: 'Стоимость доставки' })
  deliveryCost: number;

  @ApiProperty({ example: 'TR1234567890', description: 'Трекномер посылки' })
  trackingNumber: string;

  @ApiProperty({
    example: 10.5,
    description: 'Вес посылки (кг)',
    required: false,
  })
  weight?: number;

  @ApiProperty({
    example: '30x20x15 cm',
    description: 'Размеры посылки',
    required: false,
  })
  dimensions?: string;

  @ApiProperty({
    example: 'Электроника',
    description: 'Описание содержимого посылки',
    required: false,
  })
  contentDescription?: string;
}
