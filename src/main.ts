import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);

  await app.listen(process.env.PORT ?? 3000, () =>
    console.log(`run project on port : ${process.env.PORT ?? 3000}`),
  );
}
bootstrap();
