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

// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'password',
// };

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };
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
                language: 'en',
                availableLanguages: ['en'],
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
                    model: getModelByName('Request'),
                    client: prisma,
                  },
                },
                {
                  resource: {
                    model: getModelByName('Parcel'),
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
            // auth: {
            //   authenticate,
            //   cookieName: 'adminjs',
            //   cookiePassword: 'secret',
            // },
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
