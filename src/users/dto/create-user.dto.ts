import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsValidPhoneNumber } from '../decorators/is-valid-number.decorator';

const passwordRegEx =
  /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zА-Яа-яЁё\d@$!%*?&]+$/;

export class CreateUserResDto {
  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  id: number;

  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone: string;
}

export class CreateUserReqDto {
  @ApiProperty({
    example: 'Password123!',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения.' })
  @MinLength(8, { message: 'Минимальная длина пароля - 8 символов' })
  @MaxLength(20, { message: 'Максимальная длина пароля - 20 символов' })
  @Matches(passwordRegEx, {
    message:
      'Пароль должен содержать минимум одну заглавную и одну строчную букву, одну цифру и один специальный символ',
  })
  password: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  @IsString()
  @IsValidPhoneNumber(['KG', 'KZ', 'RU'])
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Полное имя пользователя',
  })
  @IsOptional()
  @IsString()
  fio?: string;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsOptional()
  email?: string;

  // Добавляем поле 'code' для второго шага регистрации
  @ApiPropertyOptional({
    example: '123456',
    description: 'Код верификации',
  })
  @IsOptional()
  @IsString()
  code?: string;
}
