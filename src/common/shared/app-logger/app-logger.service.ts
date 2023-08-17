import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_LOG_LEVEL, DEFAULT_MAX_FILE_SIZE } from '../../constants';
import { FileLogger } from './lib/file-logger';

@Injectable()
export class AppLoggerService implements LoggerService {
  private adapters: LoggerService[];

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    console.log(`Create logger instance`);

    this.adapters = [];

    const logLevels: LogLevel[] =
      this.configService.get('logger.levels') || DEFAULT_LOG_LEVEL;

    const maxFileSize: number =
      this.configService.get('logger.maxFileSize') || DEFAULT_MAX_FILE_SIZE;

    console.log(logLevels);

    const consoleLogger = new ConsoleLogger();

    consoleLogger.setLogLevels(logLevels);

    const fileLogger = new FileLogger(maxFileSize);

    fileLogger.setLogLevels(logLevels);

    this.adapters.push(consoleLogger, fileLogger);
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
