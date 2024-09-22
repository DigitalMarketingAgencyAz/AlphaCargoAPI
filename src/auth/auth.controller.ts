import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResDto } from '../users/dto/create-user.dto';
import { Public } from './public-strategy';
import { UsersService } from '../users/users.service';
import { LoginResDto } from '../users/dto/base-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // Вход в систему через телефон и пароль
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async login(
    @Body() loginDto: { phone: string; password: string },
  ): Promise<LoginResDto> {
    return this.authService.signIn(loginDto.phone, loginDto.password);
  }

  // Шаг 1 регистрации: отправка кода на телефон
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup-step1')
  @ApiOperation({ summary: 'User Signup Step 1: Request Verification Code' })
  @ApiResponse({
    status: 201,
    description: 'Verification code sent',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string' },
      },
    },
  })
  async signUpStep1(@Body() signUpDto: { phone: string }): Promise<void> {
    const user = await this.usersService.findOneByPhone(signUpDto.phone);
    if (user) {
      throw new BadRequestException(
        'Пользователь с таким номером телефона уже существует',
      );
    }

    await this.usersService.createVerificationCode(signUpDto.phone);
  }

  // Шаг 2 регистрации: проверка кода и создание аккаунта
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup-step2')
  @ApiOperation({
    summary: 'User Signup Step 2: Verify Code and Create Account',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: CreateUserResDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string' },
        password: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  async signUpStep2(
    @Body() signUpDto: { phone: string; password: string; code: string },
  ): Promise<CreateUserResDto> {
    return this.authService.signUp(signUpDto);
  }
}
