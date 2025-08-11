import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalGuards(new JwtAuthGuard()); ----> globally guard
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle('Ecommers - Rest API')
    .setDescription('')
    .setVersion('1')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(process.env.PORT ?? 3000, () =>
    console.log(`run project on port : ${process.env.PORT ?? 3000}`),
  );
}
bootstrap();
