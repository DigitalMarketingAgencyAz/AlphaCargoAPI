import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractDto {
  @ApiProperty({
    description: 'Организационная структура',
    example: 'ООО, ИП, Самозанятый',
  })
  @IsString()
  @IsNotEmpty()
  organizationalStructure: string;

  @ApiProperty({
    description: 'Наименование организации',
    example: 'ООО Рога и Копыта',
  })
  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty({
    description: 'ИНН (Идентификационный номер налогоплательщика)',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  inn: string;

  @ApiProperty({
    description: 'Email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Контактный телефон',
    example: '+7 123 456 7890',
  })
  @IsString()
  @IsNotEmpty()
  contactPhone: string;
}
