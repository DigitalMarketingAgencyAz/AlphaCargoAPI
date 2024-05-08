import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
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
  id?: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone: string;
}

export class CreateUserReqDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'Пожалуйста, введите корректный Email.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '',
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
    example: 'John Doe',
    description: 'Полное имя пользователя',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полное имя обязательно для заполнения.' })
  fio: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  @IsString()
  @IsValidPhoneNumber(['KG', 'KZ', 'RU'])
  @IsNotEmpty()
  phone: string;
}
