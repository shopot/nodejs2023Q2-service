import * as process from 'process';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { createSwaggerDoc } from './shared/lib';

const PORT = process.env.PORT || 4000;

const NODE_ENV = process.env.NODE_ENV || 'production';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  if (NODE_ENV === 'development') {
    createSwaggerDoc(app);
  }

  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

void bootstrap();
