import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResDto } from '../users/dto/base-user.dto';
import { Public } from './public-strategy';
import {
  CreateUserReqDto,
  CreateUserResDto,
} from '../users/dto/create-user.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [LoginResDto],
  })
  @ApiBody({ type: LoginDto })
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: [CreateUserResDto],
  })
  @ApiBody({ type: CreateUserReqDto })
  signUp(@Body() signUpDto: CreateUserReqDto): Promise<CreateUserResDto> {
    const payload = {
      email: signUpDto.email,
      password: signUpDto.password,
      fio: signUpDto.fio,
      phone: signUpDto.phone,
    };
    return this.authService.signUp(payload);
  }
}
