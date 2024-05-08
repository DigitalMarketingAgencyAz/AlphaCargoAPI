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
const randomFilename = () => {
    return (0, uuid_1.v4)();
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
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map