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

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user information' })
  @ApiParam({
    name: 'id',
    description: 'Id пользователя',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User data retrieved',
    type: BaseUserRes,
  })
  async getUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<BaseUserReq> {
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
    @Body() updateUserReqDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    const updatedUser = await this.usersService.update(
      userId,
      updateUserReqDto,
    );
    return updatedUser;
  }
}
