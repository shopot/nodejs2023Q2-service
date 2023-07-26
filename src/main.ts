import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors';

const PORT = 4000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

void bootstrap();
