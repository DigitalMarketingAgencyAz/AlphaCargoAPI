import {
  Body,
  Controller,
  Patch,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BaseUserRes } from './dto/base-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить информацию о пользователе' })
  @ApiResponse({
    status: 200,
    description: 'Информация о пользователе получена',
    type: BaseUserRes,
  })
  async getUser(@Req() request): Promise<BaseUserRes> {
    const userId = request.user.id;
    const user = await this.usersService.findOneById(userId);

    const userRes: BaseUserRes = {
      id: user.id,
      phone: user.phone,
      email: user.email || null,
      fio: user.fio || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userRes;
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновить информацию о пользователе' })
  @ApiBody({ type: UpdateUserReqDto })
  @ApiResponse({
    status: 200,
    description: 'Информация о пользователе обновлена',
    type: UpdateUserResDto,
  })
  async updateUser(
    @Req() request,
    @Body() updateUserReqDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    const userId = request.user.id;
    const updatedUser = await this.usersService.update(
      userId,
      updateUserReqDto,
    );

    return updatedUser;
  }

  @Delete('deactivateUser')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Деактивировать аккаунт пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Аккаунт пользователя деактивирован',
  })
  async deactivateUser(@Req() request): Promise<void> {
    const userId = request.user.id;
    await this.usersService.deactivateUser(userId);
  }
}
