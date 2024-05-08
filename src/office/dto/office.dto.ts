import { ApiProperty } from '@nestjs/swagger';

export class OfficeDto {
  @ApiProperty({ description: 'Адрес офиса', example: '123 Main St' })
  address: string;

  @ApiProperty({
    description: 'Контактные номера',
  })
  contactNumbers: string;

  @ApiProperty({ description: 'Идентификатор города', example: 1 })
  cityId: number;

  @ApiProperty({ description: 'Идентификатор страны', example: 1 })
  countryId: number;

  @ApiProperty({
    description: 'Время открытия (24-часовой формат)',
    example: 9,
  })
  openingHour: number; // Время в 24-часовом формате

  @ApiProperty({
    description: 'Время закрытия (24-часовой формат)',
    example: 18,
  })
  closingHour: number; // Время в 24-часовом формате
}
