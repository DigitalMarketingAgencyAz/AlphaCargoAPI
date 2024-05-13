import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationModule } from './location/location.module';
import { ServiceModule } from './service/service.module';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OfficeModule } from './office/office.module';
import { FranchiseModule } from './franchise/franchise.module';
import { RequestModule } from './request/request.module';
import { ParcelModule } from './parcel/parcels.module';

const randomFilename = () => {
  return uuidv4();
};

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'alphacargopassword123!',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
@Module({
  imports: [
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const { AdminJS, ComponentLoader } = await import('adminjs');
          const AdminJSPrisma = await import('@adminjs/prisma');
          AdminJS.registerAdapter({
            Resource: AdminJSPrisma.Resource,
            Database: AdminJSPrisma.Database,
          });
          const { getModelByName } = await import('@adminjs/prisma');
          const prisma = new PrismaClient();
          const uploadModule = await import('@adminjs/upload');
          const componentLoader = new ComponentLoader();
          const uploadFeature = uploadModule.default;
          return {
            adminJsOptions: {
              locale: {
                language: 'ru',
                translations: {
                  ru: {
                    labels: {
                      User: 'Пользователи',
                      City: 'Города',
                      Office: 'Офисы',
                      Country: 'Страны',
                      Franchise: 'Франшиза',
                      Bag: 'Мешки',
                      Calculator: 'Данные о калькуляторе',
                      Request: 'Заявки',
                      Service: 'Услуги',
                    },
                    properties: {
                      email: 'Электронная почта',
                      fio: 'ФИО',
                      phone: 'Телефон',
                      createdAt: 'Создано',
                      updatedAt: 'Обновлено',
                      cityname: 'Название города',
                      country: 'Страна',
                      address: 'Адрес',
                      city: 'Город',
                      openingHour: 'Час открытия',
                      closingHour: 'Час закрытия',
                      region: 'Регион',
                      birthDate: 'Дата рождения',
                      title: 'Заголовок',
                      price: 'Цена',
                      sewing: 'Пошив',
                      imported: 'Привозные',
                      countryname: 'Название страны',
                      marked: 'Маркированный',
                      brand: 'Бренд',
                      shoes: 'Обувь',
                      fullName: 'Полное имя',
                      phoneNumber: 'Номер телефона',
                      pickupAddress: 'Адрес забора',
                      pickupTime: 'Время забора',
                      packageSize: 'Размер пакета',
                      packageCount: 'Количество пакетов',
                      deliveryAddress: 'Адрес доставки',
                      headerTitle: 'Заголовок шапки',
                      headerBody: 'Тело шапки',
                      description: 'Описание',
                    },
                    messages: {
                      welcomeOnBoard_title: 'Добро пожаловать',
                      NAVIGATION: 'Навигация',
                      ru: 'Русский',
                    },
                    actions: {
                      new: 'Создать новую запись',
                      edit: 'Редактирование',
                      show: 'Удаление',
                      filter: 'Фильтр',
                    },
                  },
                },
                availableLanguages: ['en', 'ru'],
              },
              componentLoader,
              rootPath: '/admin',
              resources: [
                {
                  resource: {
                    model: getModelByName('User'),
                    client: prisma,
                  },
                  options: {
                    actions: {
                      edit: {
                        isVisible: false,
                      },
                      new: {
                        isVisible: false,
                      },
                      delete: {
                        isVisible: false,
                      },
                    },
                  },
                },
                {
                  resource: {
                    model: getModelByName('City'),
                    client: prisma,
                  },
                  options: {
                    properties: {
                      id: { isVisible: false },
                      cityname: { isTitle: true },
                    },
                  },
                },
                {
                  resource: {
                    model: getModelByName('Office'),
                    client: prisma,
                  },
                  options: {
                    properties: {
                      address: { isTitle: true },
                      contactNumbers: {
                        isVisible: { list: false, show: true, edit: true },
                      },
                      cityId: { isVisible: false },
                      countryId: { isVisible: false },
                      openingHour: { isVisible: true },
                      closingHour: { isVisible: true },
                      city: {
                        isVisible: true,
                        type: 'reference',
                        reference: 'City',
                      },
                      country: {
                        isVisible: true,
                        type: 'reference',
                        reference: 'Country',
                      },
                    },
                  },
                },
                {
                  resource: {
                    model: getModelByName('Country'),
                    client: prisma,
                  },
                  options: {
                    properties: {
                      id: { isVisible: false },
                      countryname: { isTitle: true },
                    },
                  },
                },
                {
                  resource: {
                    model: getModelByName('Franchise'),
                    client: prisma,
                  },
                },
                {
                  resource: {
                    model: getModelByName('Bag'),
                    client: prisma,
                  },
                },
                {
                  resource: {
                    model: getModelByName('Calculator'),
                    client: prisma,
                  },
                  options: {
                    properties: {
                      city: {
                        isVisible: true,
                        type: 'reference',
                        reference: 'City',
                      },
                    },
                  },
                },
                {
                  resource: {
                    model: getModelByName('Request'),
                    client: prisma,
                  },
                },
                // {
                //   resource: {
                //     model: getModelByName('Parcel'),
                //     client: prisma,
                //   },
                // },
                {
                  resource: {
                    model: getModelByName('Service'),
                    client: prisma,
                  },
                  features: [
                    uploadFeature({
                      componentLoader,
                      provider: {
                        local: {
                          bucket: 'uploads/',
                          opts: { baseUrl: '/uploads' },
                        },
                      },
                      properties: {
                        key: 'imagePath',
                        mimeType: 'image/png',
                      },
                      uploadPath: (record, filename) => {
                        const extension = filename.split('.').pop();
                        const randomName = randomFilename();
                        return `service/${record.id()}/${randomName}.${extension}`;
                      },
                    }),
                  ],
                },
              ],
            },
            auth: {
              authenticate,
              cookieName: 'adminjs',
              cookiePassword: 'secret',
            },
            sessionOptions: {
              resave: true,
              saveUninitialized: true,
              secret: 'secret',
            },
          };
        },
      }),
    ),
    AuthModule,
    UsersModule,
    LocationModule,
    ServiceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Путь к директории с файлами
      serveRoot: '/uploads', // Путь, по которому будут доступны файлы
    }),
    OfficeModule,
    FranchiseModule,
    RequestModule,
    ParcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
