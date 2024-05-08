import { ApiProperty } from '@nestjs/swagger';

// DTO для отображения данных о городе
export class CityDto {
  @ApiProperty({ description: 'ID города', example: 1 })
  id: number;

  @ApiProperty({ description: 'Название города', example: 'New York' })
  cityname: string;
}

// DTO для отображения данных о стране
export class CountryDto {
  @ApiProperty({ description: 'ID страны', example: 1 })
  id: number;

  @ApiProperty({ description: 'Название страны', example: 'USA' })
  countryname: string;
}
