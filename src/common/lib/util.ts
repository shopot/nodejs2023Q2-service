import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwaggerDocs(app: INestApplication) {
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

  SwaggerModule.setup('docs', app, document);
}

export function parseRequest(
  statusCode: StatusCodes = StatusCodes.OK,
  request: Request,
) {
  const { ip, method, originalUrl, body, params } = request;

  const paramsObj = !isObjectEmpty(params)
    ? `Params: ${JSON.stringify(params)} `
    : '';

  const bodyObj = !isObjectEmpty(body) ? `Body: ${JSON.stringify(body)} ` : '';

  return `${method} ${originalUrl} ${paramsObj}${bodyObj}${statusCode} - ${ip}`;
}

export function isObjectEmpty(objectName: object): boolean {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
}

export function isObject(arg: unknown): boolean {
  return typeof arg === 'object' && arg !== null;
}

export function getFormatedTimestamp() {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-GB', options).format(new Date());
}
