import * as process from 'process';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { createSwaggerDocs } from './common/lib';
import { AppLoggerService } from './common/shared/app-logger/app-logger.service';
import { HttpExceptionFilter } from './common/filters';

const PORT = process.env.PORT || 4000;

const NODE_ENV = process.env.NODE_ENV || 'production';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
    bufferLogs: true,
  });

  app.useLogger(app.get(AppLoggerService));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  // Cross-origin resource sharing (CORS)
  app.enableCors({
    origin: true,
    credentials: true,
  });

  if (NODE_ENV === 'development') {
    createSwaggerDocs(app);
  }

  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

void bootstrap();
