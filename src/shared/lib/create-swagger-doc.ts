import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerDoc = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service OpenAPI 3.0')
    .setVersion('1.0')
    .addTag('user')
    .addTag('track')
    .addTag('album')
    .addTag('artist')
    .addTag('favs')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
};
