import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
  @IsEmail({}, { message: 'Неправильный формат email' })
  accessToken: string;
}
export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Неправильный формат email' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;
}
