import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('notifications')
@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @Get()
  async getUserNotifications(@Req() request) {
    const userId = request.user.id;
    return this.notificationsService.getUserNotifications(userId);
  }

  @Patch(':notificationId')
  async markAsRead(
    @Req() request,
    @Param('notificationId', ParseIntPipe) notificationId: number,
  ) {
    const userId = request.user.id;
    return this.notificationsService.markAsRead(userId, notificationId);
  }
}
