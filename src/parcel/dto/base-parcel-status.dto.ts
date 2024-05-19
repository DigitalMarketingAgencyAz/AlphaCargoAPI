import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetParcelStatusDto {
  @ApiProperty({
    example: '01.01.2024 12:00:00',
    description: 'Дата и время события',
  })
  @IsString()
  date: string;

  @ApiProperty({ example: 'Принят на склад', description: 'Статус посылки' })
  @IsString()
  status: string;
}
