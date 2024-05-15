import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateDto {
  @ApiProperty({ example: 1, description: 'ID of the city From' })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  cityFromId: number;

  @ApiProperty({ example: 1, description: 'ID of the city To' })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  cityToId: number;

  @ApiProperty({ example: 1, description: 'ID of the parcel type' })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  parcelTypeId: number;

  @ApiProperty({ example: 10, description: 'Weight of the parcel' })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  weight: number;

  @ApiProperty({ example: 2, description: 'Count of the parcel type' })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  countOfType: number;

  @ApiProperty({ example: 1, description: 'ID of the bag' })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  bagId: number;
}
