import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResDto } from '../users/dto/base-user.dto';
import { Public } from './public-strategy';
import {
  CreateUserReqDto,
  CreateUserResDto,
} from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login-step1')
  @ApiOperation({ summary: 'User Login Step 1: Request Verification Code' })
  @ApiResponse({
    status: 200,
    description: 'Verification code sent',
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
  async loginStep1(
    @Body() loginDto: { phone: string; password: string },
  ): Promise<void> {
    const user = await this.usersService.findOneByPhone(loginDto.phone);
    if (!user) {
      throw new BadRequestException('Пользователь с таким номером не найден');
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Неправильные учетные данные');
    }

    await this.usersService.createVerificationCode(loginDto.phone);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login-step2')
  @ApiOperation({
    summary: 'User Login Step 2: Verify Code and Sign In',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    type: LoginResDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string' },
        code: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async loginStep2(
    @Body() loginDto: { phone: string; code: string; password: string },
  ): Promise<LoginResDto> {
    const isValid = await this.usersService.verifyCode(
      loginDto.phone,
      loginDto.code,
    );
    if (!isValid) {
      throw new BadRequestException('Неверный код верификации');
    }

    return this.authService.signIn(loginDto.phone, loginDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup-step1')
  @ApiOperation({ summary: 'User Signup Step 1: Request Verification Code' })
  @ApiResponse({
    status: 201,
    description: 'Verification code sent',
  })
  @ApiBody({ type: CreateUserReqDto })
  async signUpStep1(@Body() signUpDto: CreateUserReqDto): Promise<void> {
    const tgUser = await this.usersService.findOneByPhoneTG(signUpDto.phone);
    if (!tgUser) {
      throw new BadRequestException('Сначала активируйте Telegram бота');
    }

    await this.usersService.createVerificationCode(signUpDto.phone);
  }

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
        email: { type: 'string' },
        password: { type: 'string' },
        fio: { type: 'string' },
        phone: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  async signUpStep2(
    @Body() signUpDto: CreateUserReqDto & { code: string },
  ): Promise<CreateUserResDto> {
    return this.authService.signUp(signUpDto);
  }
}
