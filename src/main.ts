import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AutoSpare Manager API')
    .setDescription('Backend APIs for Auto Spare Shop')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // removes extra fields
      forbidNonWhitelisted: true, // throws error for extra fields
      transform: true,           // auto-transform payloads to DTOs
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
