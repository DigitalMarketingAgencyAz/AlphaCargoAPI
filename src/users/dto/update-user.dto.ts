import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zА-Яа-яЁё\d@$!%*?&]+$/;

export class UpdateUserReqDto {
  @ApiPropertyOptional({
    example: '',
    description: 'Пароль пользователя',
  })
  @IsOptional()
  @MinLength(8, { message: 'Минимальная длина пароля - 8 символов' })
  @MaxLength(20, { message: 'Максимальная длина пароля - 20 символов' })
  @Matches(passwordRegEx, {
    message:
      'Пароль должен содержать минимум одну заглавную и одну строчную букву, одну цифру и один специальный символ',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Полное имя пользователя',
  })
  @IsOptional()
  @IsString()
  fio?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  @IsOptional()
  @IsPhoneNumber(null, {
    message: 'Пожалуйста, введите корректный номер телефона.',
  })
  phone?: string;
}

export class UpdateUserResDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Полное имя пользователя',
  })
  fio?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone?: string;
}
