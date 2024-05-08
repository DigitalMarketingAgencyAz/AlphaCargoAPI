import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';
import { IsValidPhoneNumber } from 'src/users/decorators/is-valid-number.decorator';

export class CreateRequestDto {
  @ApiProperty({
    example: 'Иван Иванов',
    description: 'ФИО отправителя',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '+71234567890',
    description: 'Номер телефона отправителя',
  })
  @IsValidPhoneNumber(['KG', 'KZ', 'RU'])
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Москва, Красная площадь, 1',
    description: 'Адрес, откуда нужно забрать посылку',
  })
  @IsString()
  @IsNotEmpty()
  pickupAddress: string;

  @ApiProperty({
    example: '2023-10-10 14:00:00',
    description: 'Дата и время забора посылки',
  })
  @IsString()
  pickupTime: string;

  @ApiProperty({
    example: 'Средний размер',
    description: 'Размер посылки',
  })
  @IsString()
  @IsNotEmpty()
  packageSize: string;

  @ApiProperty({
    example: 2,
    description: 'Количество посылок',
  })
  @Min(1)
  @IsNotEmpty()
  packageCount: number;

  @ApiProperty({
    example: 'Санкт-Петербург, Невский проспект, 22',
    description: 'Адрес доставки посылки',
  })
  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;
}
