import { ApiProperty } from '@nestjs/swagger';

export class TariffDto {
  @ApiProperty({
    description: 'ID тарифа',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Страна',
    example: 'Россия',
  })
  country: string;

  @ApiProperty({
    description: 'Тип товара',
    example: 'Пошив',
  })
  type: string;

  @ApiProperty({
    description: 'Город назначения',
    example: 'Москва',
  })
  cityTo: string;

  @ApiProperty({
    description: 'Цена тарифа',
    example: 1000,
  })
  price: number;

  @ApiProperty({
    description: 'Срок доставки',
    example: '3-5 дней',
  })
  deliveryTime: string;
}
