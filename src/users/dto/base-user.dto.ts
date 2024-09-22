import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidPhoneNumber } from '../decorators/is-valid-number.decorator';

export class BaseUserReq {
  @ApiPropertyOptional({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+1234567890',
  })
  @IsString()
  @IsValidPhoneNumber(['KG', 'KZ', 'RU'])
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    description: 'Полное имя пользователя',
    example: 'John Doe',
  })
  @IsOptional()
  fio?: string;
}

export class BaseUserRes {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    required: false,
  })
  id?: number;

  @ApiPropertyOptional({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email?: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+1234567890',
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'Полное имя пользователя',
    example: 'John Doe',
  })
  fio?: string;

  @ApiPropertyOptional({
    description: 'Дата и время создания пользователя',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'Дата и время последнего обновления пользователя',
  })
  updatedAt?: Date;
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

  @ApiPropertyOptional({
    description: 'user fio',
  })
  fio?: string;

  @ApiProperty({
    description: 'user phone',
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'user email',
  })
  email?: string;
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
