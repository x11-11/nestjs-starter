import fs from 'fs';
import path from 'path';
import { NestFactory, NestApplication } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  await setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(8080);
}
bootstrap();
/**
 */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'),
);

async function setupSwagger(app: NestApplication) {
  const { name, version, description } = packageJson;
  const swaggerConfig = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    //.addTag('theapp')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}
