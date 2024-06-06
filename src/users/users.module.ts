import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './users.controller';
import { TgbotModule } from 'src/tgbot/tgbot.module';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [
    TgbotModule.registerAsync({
      useFactory: () => ({
        botToken: '7437824568:AAFMKnX_DolPIRbJCmPoqtBSAkwFL10NsXM',
      }),
      inject: [],
    }),
  ],
})
export class UsersModule {}
