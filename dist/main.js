"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Your API Title')
        .setDescription('Your API description')
        .setVersion('1.0')
        .addServer('http://localhost:3333/', 'Local environment')
        .addBearerAuth()
        .addServer('https://alfacargobackend.onrender.com/', 'Production')
        .addTag('Aplha Cargo')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || 3333);
}
bootstrap();
//# sourceMappingURL=main.js.map