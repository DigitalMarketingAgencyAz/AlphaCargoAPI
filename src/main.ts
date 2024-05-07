import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    // .addServer('http://localhost:3333/', 'Local environment')
    .addBearerAuth()
    // .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://alfacargobackend.onrender.com/', 'Production')
    .addTag('Aplha Cargo')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
