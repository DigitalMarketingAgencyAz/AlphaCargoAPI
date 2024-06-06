import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidPhoneNumber } from '../decorators/is-valid-number.decorator';

export class BaseUserReq {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'John Doe',
  })
  fio: string;
}

export class BaseUserRes {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'John Doe',
  })
  fio: string;

  @ApiProperty({
    description: 'Дата и время создания пользователя',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата и время последнего обновления пользователя',
  })
  updatedAt: Date;
}

export class LoginResDto {
  @ApiProperty({
    description: 'accessToken',
  })
  accessToken: string;

  @ApiProperty({
    description: 'user ID',
  })
  id: number;

  @ApiProperty({
    description: 'user fio',
  })
  fio: string;

  @ApiProperty({
    description: 'user phone',
  })
  phone: string;

  @ApiProperty({
    description: 'user email',
  })
  email: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'User phone',
    example: '+7123456789',
  })
  @IsString()
  @IsValidPhoneNumber(['KG', 'KZ', 'RU'])
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;
}
