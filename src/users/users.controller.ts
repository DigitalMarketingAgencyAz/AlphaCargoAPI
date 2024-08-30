import {
  Body,
  Controller,
  Patch,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BaseUserReq, BaseUserRes } from './dto/base-user.dto';
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

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user information' })
  @ApiBody({ type: UpdateUserReqDto })
  @ApiResponse({
    status: 200,
    description: 'User information updated',
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

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  async deleteUser(@Req() request): Promise<void> {
    const userId = request.user.id;
    await this.usersService.deleteUserById(userId);
  }
}


  // @Get('userparcel')
  // @ApiResponse({
  //   status: 200,
  //   description: 'Возвращает список всех посылок пользователя.',
  // })
  // getUserParcels(@Req() request) {
  //   const userId = request.user.id;
  //   return this.usersService.getUserParcels(userId);
  // }
}
