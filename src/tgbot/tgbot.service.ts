import { Inject, Injectable } from '@nestjs/common';
import { session, Telegraf, Context } from 'telegraf';
import { intialSession } from './middlewares/initial-session.middleware';
import { BOT_MODULE_OPTIONS } from './constants';
import { Option } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TgbotService {
  private readonly bot: Telegraf;

  constructor(
    @Inject(BOT_MODULE_OPTIONS) private readonly option: Option,
    private readonly prisma: PrismaService,
  ) {
    this.bot = new Telegraf(option.botToken);
    this.bot.use(session());
    this.bot.use(intialSession());
    this.initializeBot();
  }

  private initializeBot() {
    this.bot.start(async (ctx: Context) => {
      const customCtx = ctx as any;
      if (!customCtx.session.phoneNumber) {
        await ctx.reply('Пожалуйста, поделитесь вашим номером телефона', {
          reply_markup: {
            one_time_keyboard: true,
            keyboard: [
              [{ text: 'Поделиться номером телефона', request_contact: true }],
            ],
          },
        });
      } else {
        await ctx.reply('Вы уже зарегистрированы');
      }
    });

    this.bot.on('contact', async (ctx) => {
      const phone = ctx.message?.contact.phone_number;

      try {
        await this.prisma.tGUsers.upsert({
          where: { chat_id: ctx.from.id },
          update: { phone },
          create: { chat_id: ctx.from.id, phone },
        });

        await ctx.reply('Номер телефона успешно сохранен');
      } catch (error) {
        console.error('Ошибка при сохранении номера телефона:', error);
        await ctx.reply(
          'Произошла ошибка при сохранении вашего номера телефона. Пожалуйста, попробуйте еще раз.',
        );
      }
    });

    this.bot.command('myphone', async (ctx: Context) => {
      try {
        const tgUser = await this.prisma.tGUsers.findUnique({
          where: { chat_id: ctx.from.id },
        });

        if (tgUser) {
          await ctx.reply(`Ваш номер телефона: ${tgUser.phone}`);
        } else {
          await ctx.reply(
            'Номер телефона не найден. Пожалуйста, поделитесь им, используя /start',
          );
        }
      } catch (error) {
        console.error('Ошибка при получении номера телефона:', error);
        await ctx.reply(
          'Произошла ошибка при получении вашего номера телефона. Пожалуйста, попробуйте еще раз.',
        );
      }
    });

    this.bot.launch();
  }

  async sendVerificationCode(chat_id: number, code: string): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(
        chat_id,
        `Ваш код верификации: ${code}`,
      );
      console.log(`Код верификации ${code} отправлен на chat_id ${chat_id}`);
    } catch (error) {
      console.error('Ошибка при отправке кода верификации:', error);
    }
  }
}
