import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './RootModule';
import { ValidationPipe } from "@nestjs/common";
import { MyExceptionFilter } from "#modules/experimental/MyExceptionFilter";

async function bootstrap() {
    const app = await NestFactory.create(RootModule);
    app.useGlobalPipes(new ValidationPipe({
        stopAtFirstError: true
    }));
    app.useGlobalFilters(new MyExceptionFilter());
    await app.listen(3000);
}

bootstrap();
