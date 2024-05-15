import { ApiProperty } from '@nestjs/swagger';

export class ParcelTypeDto {
  @ApiProperty({ example: 1, description: 'ID of the parcel type' })
  id: number;

  @ApiProperty({
    example: 'Parcel Type Name',
    description: 'Name of the parcel type',
  })
  name: string;
}
