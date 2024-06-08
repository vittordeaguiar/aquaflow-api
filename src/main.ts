import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '..', './ssl/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', './ssl/cert.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  await app.listen(7777);
}

bootstrap();
