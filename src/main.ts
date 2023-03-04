import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //https://docs.nestjs.com/techniques/validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.listen(3000);
}
bootstrap();