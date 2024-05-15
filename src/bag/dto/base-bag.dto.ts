import { ApiProperty } from '@nestjs/swagger';

export class BagDto {
  @ApiProperty({ example: 1, description: 'ID of the bag' })
  id: number;

  @ApiProperty({ example: 'Bag Title', description: 'Title of the bag' })
  title: string;

  @ApiProperty({ example: 100, description: 'Price of the bag' })
  price: number;
}
