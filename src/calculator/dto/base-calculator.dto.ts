import { ApiProperty } from '@nestjs/swagger';

export class BaseCalculatorDto {
  @ApiProperty({ description: 'ID калькулятора', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Количество швейных изделий',
    example: 100,
    nullable: true,
  })
  sewing?: number;

  @ApiProperty({
    description: 'Количество импортированных изделий',
    example: 50,
    nullable: true,
  })
  imported?: number;

  @ApiProperty({
    description: 'Количество маркированных изделий',
    example: 30,
    nullable: true,
  })
  marked?: number;

  @ApiProperty({
    description: 'Количество брендированных изделий',
    example: 20,
    nullable: true,
  })
  brand?: number;

  @ApiProperty({
    description: 'Количество обуви',
    example: 40,
    nullable: true,
  })
  shoes?: number;

  @ApiProperty({ description: 'ID города', example: 1 })
  cityId: number;
}
