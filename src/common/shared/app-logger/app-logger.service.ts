import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileLogger } from './lib/file-logger';

@Injectable()
export class AppLoggerService implements LoggerService {
  private adapters: LoggerService[];

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.adapters = [];

    const logLevels: LogLevel[] = this.configService.get('logger.levels');

    const maxFileSize: number = this.configService.get('logger.maxFileSize');

    const consoleLogger = new ConsoleLogger();

    consoleLogger.setLogLevels(logLevels);

    const fileLogger = new FileLogger(maxFileSize);

    fileLogger.setLogLevels(logLevels);

    this.adapters.push(consoleLogger, fileLogger);

    this.log(
      `Logging collector process is started with levels: "${logLevels.join(
        ' ',
      )}"`,
      AppLoggerService.name,
    );
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.adapters.forEach((logger) => logger.log(message, ...optionalParams));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.adapters.forEach((logger) => logger.error(message, ...optionalParams));
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.adapters.forEach((logger) => logger.warn(message, ...optionalParams));
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this.adapters.forEach((logger) => logger.debug(message, ...optionalParams));
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this.adapters.forEach((logger) =>
      logger.verbose(message, ...optionalParams),
    );
  }
}
