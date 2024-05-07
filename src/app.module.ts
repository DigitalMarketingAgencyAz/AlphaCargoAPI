import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaClient } from '@prisma/client';
import { LocationModule } from './location/location.module';

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
          await import('adminjs').then(async ({ AdminJS }) => {
            const AdminJSPrisma = await import('@adminjs/prisma');
            AdminJS.registerAdapter({
              Resource: AdminJSPrisma.Resource,
              Database: AdminJSPrisma.Database,
            });
          });
          const { getModelByName } = await import('@adminjs/prisma');
          // Note: Feel free to contribute to this documentation if you find a Nest-way of
          // injecting PrismaService into AdminJS module
          const prisma = new PrismaClient();
          // `_baseDmmf` contains necessary Model metadata but it is a private method
          // so it isn't included in PrismaClient type
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                {
                  resource: {
                    model: getModelByName('User'),
                    client: prisma,
                  },
                  options: {},
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
