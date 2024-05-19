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
import { CalculatorModule } from './calculator/calculator.module';
import { BagModule } from './bag/bag.module';
import { ParcelTypeModule } from './parceltype/parcel-type.module';
import { NotificationModule } from './notification/notification.module';

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
                    actions: {
                      new: 'Создать новый',
                      edit: 'Редактировать',
                      show: 'Показать',
                      delete: 'Удалить',
                      bulkDelete: 'Удалить все',
                      list: 'Список',
                    },
                    buttons: {
                      save: 'Сохранить',
                      addNewItem: 'Добавить новый элемент',
                      filter: 'Фильтр',
                      filterActive: 'Фильтр ({{count}})',
                      applyChanges: 'Применить изменения',
                      resetFilter: 'Сбросить фильтры',
                      confirmRemovalMany:
                        'Подтвердить удаление {{count}} записи',
                      confirmRemovalMany_plural:
                        'Подтвердить удаление {{count}} записей',
                      logout: 'Выйти',
                      login: 'Войти',
                      seeTheDocumentation: 'Смотрите: <1>документация</1>',
                      createFirstRecord: 'Создать первую запись',
                      contactUs: 'Связаться с нами',
                      cancel: 'Отмена',
                      confirm: 'Подтвердить',
                    },
                    components: {
                      DropZone: {
                        placeholder:
                          'Перетащите свой файл сюда или нажмите, чтобы просмотреть',
                        acceptedSize: 'Максимальный размер: {{maxSize}}',
                        acceptedType: 'Поддерживаются: {{mimeTypes}}',
                        unsupportedSize: 'Файл {{fileName}} слишком велик',
                        unsupportedType:
                          'Тип файла {{fileName}} не поддерживается: {{fileType}}',
                      },
                      LanguageSelector: {
                        availableLanguages: {
                          de: 'Немецкий',
                          en: 'Английский',
                          es: 'Испанский',
                          it: 'Итальянский',
                          ja: 'Японский',
                          pl: 'Польский',
                          'pt-BR': 'Португальский (Бразилия)',
                          ua: 'Украинский',
                          'zh-CN': 'Китайский',
                          ru: 'Русский',
                        },
                      },
                      Login: {
                        welcomeHeader: 'Добро пожаловать',
                        welcomeMessage:
                          'в AdminJS - ведущую панель администратора с открытым исходным кодом для приложений Node.js, которая позволяет управлять всеми вашими данными в одном месте',
                        properties: {
                          email: 'Электронная почта',
                          password: 'Пароль',
                        },
                        loginButton: 'Войти в систему',
                      },
                    },
                    labels: {
                      User: 'Пользователи',
                      City: 'Города',
                      Office: 'Офисы',
                      Country: 'Страны',
                      Franchise: 'Франшиза',
                      Bag: 'Тип посылки',
                      ParcelType: 'Тип товара',
                      Calculator: 'Данные о калькуляторе',
                      Request: 'Заявки',
                      Service: 'Услуги',
                      Notification: 'Уведомления',
                      navigation: 'Навигация',
                      pages: 'Страницы',
                      selectedRecords: 'Выбрано ({{selected}})',
                      filters: 'Фильтры',
                      adminVersion: 'Версия AdminJS: {{version}}',
                      appVersion: 'Версия приложения: {{version}}',
                      dashboard: 'Панель управления',
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
                      cityFrom: 'Город отправления',
                      cityTo: 'Город доставки',
                    },
                    messages: {
                      successfullyBulkDeleted:
                        'Успешно удалено {{count}} запись',
                      successfullyBulkDeleted_plural:
                        'Успешно удалено {{count}} записей',
                      successfullyDeleted: 'Успешно удалена выбранная запись',
                      successfullyUpdated: 'Успешно обновлена выбранная запись',
                      thereWereValidationErrors:
                        'Есть ошибки валидации – посмотрите ниже',
                      forbiddenError:
                        'Вы не можете выполнять действия {{actionName}} на {{resourceId}}',
                      anyForbiddenError:
                        'Вы не можете выполнить заданное действие',
                      successfullyCreated: 'Успешно создана новая запись',
                      bulkDeleteError:
                        'Произошла ошибка при удалении записей. Проверьте консоль для дополнительной информации',
                      errorFetchingRecords:
                        'Произошла ошибка при получении записей. Проверьте консоль для дополнительной информации',
                      errorFetchingRecord:
                        'Произошла ошибка при получении записи. Проверьте консоль для дополнительной информации',
                      noRecordsSelected: 'Вы не выбрали ни одной записи',
                      theseRecordsWillBeRemoved:
                        'Следующая запись будет удалена',
                      theseRecordsWillBeRemoved_plural:
                        'Следующие записи будут удалены',
                      pickSomeFirstToRemove:
                        'Чтобы удалить записи, сначала их нужно выбрать',
                      error404Resource: 'Ресурс с ID: {{resourceId}} не найден',
                      error404Action:
                        'Ресурс с ID: {{resourceId}} не имеет действия с названием: {{actionName}} или у вас нет прав на его использование!',
                      error404Record:
                        'Ресурс с ID: {{resourceId}} не имеет записи с ID: {{recordId}} или у вас нет прав на его использование!',
                      seeConsoleForMore:
                        'Посмотрите консоль разработчика, чтобы узнать больше...',
                      noActionComponent:
                        'Вы должны реализовать ActionComponent для своего действия',
                      noRecordsInResource: 'В этом ресурсе нет записей',
                      noRecords: 'Нет записей',
                      confirmDelete:
                        'Вы действительно хотите удалить этот элемент?',
                      welcomeOnBoard_title: 'Добро пожаловать на борт!',
                      welcomeOnBoard_subtitle:
                        'Теперь вы один из нас! Мы подготовили для вас несколько советов для начала:',
                      addingResources_title: 'Добавление ресурсов',
                      addingResources_subtitle:
                        'Как добавить новые ресурсы в боковую панель',
                      customizeResources_title: 'Настройка ресурсов',
                      customizeResources_subtitle:
                        'Определение поведения, добавление свойств и т.д.',
                      customizeActions_title: 'Настройка действий',
                      customizeActions_subtitle:
                        'Изменение существующих действий и добавление новых',
                      writeOwnComponents_title: 'Написание компонентов',
                      writeOwnComponents_subtitle:
                        'Как изменить внешний вид AdminJS',
                      customDashboard_title: 'Панель управления',
                      customDashboard_subtitle:
                        'Как изменить этот экран и добавить новые страницы в боковую панель',
                      roleBasedAccess_title: 'Контроль доступа на основе ролей',
                      roleBasedAccess_subtitle:
                        'Создание ролей и разрешений пользователей в AdminJS',
                      community_title:
                        'Присоединяйтесь к нашему сообществу в Discord',
                      community_subtitle:
                        'Общайтесь с разработчиками и другими пользователями AdminJS',
                      foundBug_title: 'Нашли ошибку? Нужны улучшения?',
                      foundBug_subtitle:
                        'Опишите проблему в нашем репозитории на GitHub',
                      needMoreSolutions_title:
                        'Нужны более продвинутые решения?',
                      needMoreSolutions_subtitle:
                        'Мы здесь, чтобы помочь вам с UX/UI дизайном и разработкой программного обеспечения на основе (и не только) AdminJS',
                      invalidCredentials:
                        'Неправильный адрес электронной почты и/или пароль',
                      pageNotFound_title: 'Страница не найдена',
                      pageNotFound_subtitle:
                        'Страница <strong>"{{pageName}}"</strong> не существует',
                      componentNotFound_title: 'Компонент не указан',
                      componentNotFound_subtitle:
                        'Вы должны указать компонент, который будет рендерить этот элемент',
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
                    model: getModelByName('ParcelType'),
                    client: prisma,
                  },
                },
                {
                  resource: {
                    model: getModelByName('Calculator'),
                    client: prisma,
                  },
                },
                {
                  resource: {
                    model: getModelByName('Request'),
                    client: prisma,
                  },
                },
                {
                  resource: {
                    model: getModelByName('Notification'),
                    client: prisma,
                  },
                },
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
    CalculatorModule,
    BagModule,
    ParcelTypeModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
