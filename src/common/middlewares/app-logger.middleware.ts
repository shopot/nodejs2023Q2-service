import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { AppLoggerService } from '../shared/app-logger/app-logger.service';
import { isObjectEmpty } from '../lib';

const CTX = 'ExceptionFilter';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, params } = request;

    const paramsObj = !isObjectEmpty(params)
      ? `params ${JSON.stringify(params)} `
      : '';

    const bodyObj = !isObjectEmpty(body) ? `body ${JSON.stringify(body)} ` : '';

    response.on('finish', () => {
      const { statusCode } = response;

      const data = `${method} route: {${originalUrl}} ${paramsObj}${bodyObj}${statusCode} - ${ip}`;

      switch (statusCode) {
        case StatusCodes.INTERNAL_SERVER_ERROR: {
          this.logger.error(data, CTX);

          break;
        }

        case StatusCodes.FORBIDDEN: {
          this.logger.log(data, CTX);

          break;
        }

        case StatusCodes.BAD_REQUEST: {
          this.logger.log(data, CTX);

          break;
        }

        case StatusCodes.UNAUTHORIZED: {
          this.logger.log(data, CTX);

          break;
        }
      }
    });

    next();
  }
}
