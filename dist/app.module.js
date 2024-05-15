"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const location_module_1 = require("./location/location.module");
const service_module_1 = require("./service/service.module");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const office_module_1 = require("./office/office.module");
const franchise_module_1 = require("./franchise/franchise.module");
const request_module_1 = require("./request/request.module");
const parcels_module_1 = require("./parcel/parcels.module");
const calculator_module_1 = require("./calculator/calculator.module");
const bag_module_1 = require("./bag/bag.module");
const parcel_type_module_1 = require("./parceltype/parcel-type.module");
const randomFilename = () => {
    return (0, uuid_1.v4)();
};
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'alphacargopassword123!',
};
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
                useFactory: async () => {
                    const { AdminJS, ComponentLoader } = await import('adminjs');
                    const AdminJSPrisma = await import('@adminjs/prisma');
                    AdminJS.registerAdapter({
                        Resource: AdminJSPrisma.Resource,
                        Database: AdminJSPrisma.Database,
                    });
                    const { getModelByName } = await import('@adminjs/prisma');
                    const prisma = new client_1.PrismaClient();
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
                                            Bag: 'Тип посылки',
                                            ParcelType: 'Тип товара',
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
                                            cityFrom: 'Город отправления',
                                            cityTo: 'Город доставки',
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
            })),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            location_module_1.LocationModule,
            service_module_1.ServiceModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            office_module_1.OfficeModule,
            franchise_module_1.FranchiseModule,
            request_module_1.RequestModule,
            parcels_module_1.ParcelModule,
            calculator_module_1.CalculatorModule,
            bag_module_1.BagModule,
            parcel_type_module_1.ParcelTypeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map