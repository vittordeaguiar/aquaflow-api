import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '..', './src/config/key.pem')),
    cert: fs.readFileSync(
      path.resolve(__dirname, '..', './src/config/cert.pem'),
    ),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.setGlobalPrefix('v1'); // Prefixo global

  app.enableCors({
    origin: ['https://localhost:5173'], // substituir pela URL do front-end
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
