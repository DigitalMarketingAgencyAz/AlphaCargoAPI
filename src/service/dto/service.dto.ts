import { ApiProperty } from '@nestjs/swagger';

export class ServiceDto {
  @ApiProperty({ description: 'ID сервиса', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Заголовок услуги',
  })
  header_title: string;

  @ApiProperty({
    description: 'Описание сервиса',
  })
  header_body: string;

  @ApiProperty({
    description: 'Подробное описание',
  })
  description: string;

  @ApiProperty({
    description: 'Путь к изображению',
    nullable: true,
  })
  imagePath?: string; // Поле, которое может быть пустым или отсутствовать
}
