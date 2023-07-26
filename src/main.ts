import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 4000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

void bootstrap();
