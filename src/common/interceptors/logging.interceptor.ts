import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

import { AppLoggerService } from '../shared/app-logger/app-logger.service';
import { isObjectEmpty } from '../lib';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(AppLoggerService) private readonly logger: AppLoggerService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();

    const { ip, method, originalUrl, body, params } = ctx.getRequest<Request>();

    const { statusCode } = ctx.getResponse<Response>();

    const currentContext = context.getClass().name || '';

    const paramsObj = !isObjectEmpty(params)
      ? `params ${JSON.stringify(params)} `
      : '';

    const bodyObj = !isObjectEmpty(body) ? `body ${JSON.stringify(body)} ` : '';

    const message = `${method} route {${originalUrl}} ${paramsObj}${bodyObj}${statusCode} - ${ip}`;

    if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
      this.logger.error(message, currentContext);

      return next
        .handle()
        .pipe(tap(() => this.logger.error(message, currentContext)));
    }

    return next
      .handle()
      .pipe(tap(() => this.logger.log(message, currentContext)));
  }
}
