import {
  Body,
  Controller,
  Patch,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  Get,
  UseGuards,
  ParseIntPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserResDto } from './dto/create-user.dto';
import { BaseUserReq, BaseUserRes } from './dto/base-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({
    status: 200,
    description: 'User data retrieved',
    type: BaseUserRes,
  })
  async getUser(@Req() request): Promise<BaseUserReq> {
    const userId = request.user.id;
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({
    name: 'id',
    description: 'ID пользователя',
    type: Number,
  })
  @ApiBody({ type: UpdateUserReqDto })
  @ApiResponse({
    status: 200,
    description: 'User information updated',
    type: CreateUserResDto,
  })
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Req() request,
    @Body() updateUserReqDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    console.log(request.user, userId);
    if (request.user.id !== userId) {
      throw new ForbiddenException();
    }
    const updatedUser = await this.usersService.update(
      userId,
      updateUserReqDto,
    );
    return updatedUser;
  }

  @Get('userparcel')
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех посылок пользователя.',
  })
  getUserParcels(@Req() request) {
    const userId = request.user.id;
    return this.usersService.getUserParcels(userId);
  }
}
