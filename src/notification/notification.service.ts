import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserNotifications(userId: number) {
    try {
      const notifications = await this.prisma.notification.findMany({
        include: {
          reads: true,
        },
      });

      return notifications.map((notification) => {
        const readInfo = notification.reads.find(
          (read) => read.userId === userId,
        );
        return {
          id: notification.id,
          title: notification.title,
          message: notification.message,
          createdAt: notification.createdAt,
          read: !!readInfo,
          readAt: readInfo ? readInfo.readAt : null,
        };
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch notifications');
    }
  }
  async markAsRead(userId: number, notificationId: number) {
    try {
      return await this.prisma.notificationRead.upsert({
        where: {
          userId_notificationId: {
            userId,
            notificationId,
          },
        },
        update: {},
        create: {
          userId,
          notificationId,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2002') {
        return await this.prisma.notificationRead.findUnique({
          where: {
            userId_notificationId: {
              userId,
              notificationId,
            },
          },
        });
      } else {
        throw new BadRequestException('Failed to mark notification as read');
      }
    }
  }
}
