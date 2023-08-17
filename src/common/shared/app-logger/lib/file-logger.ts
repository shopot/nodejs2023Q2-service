import { Logger, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { LogLevelType } from '../app-loger.types';
import * as process from 'process';

export class FileLogger implements LoggerService {
  private readonly logDirectory = './logs';

  private readonly maxFileSize: number;

  private readonly maxFiles = 5;

  private logLevels: LogLevel[];

  constructor(maxFileSize: number) {
    this.maxFileSize = maxFileSize;
  }

  setLogLevels(levels: LogLevel[]) {
    this.logLevels = levels;
  }

  async log(message: any, context?: string) {
    await this.write(LogLevelType.LOG, message, context);
  }

  async error(message: any, trace?: string, context?: string) {
    await this.write(LogLevelType.ERROR, message, context, trace);
  }

  async warn(message: any, context?: string) {
    await this.write(LogLevelType.WARN, message, context);
  }

  async debug(message: any, context?: string) {
    await this.write(LogLevelType.DEBUG, message, context);
  }

  private async write(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    if (!this.isLogLevelEnabled(level)) {
      return;
    }

    const timestamp = Logger.getTimestamp(); //new Date().toISOString();

    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${
      context ? `[${context}] ` : ''
    }${message}${trace ? '\n' + trace : ''}${os.EOL}`;

    const target =
      level === LogLevelType.ERROR || level === LogLevelType.WARN
        ? 'error'
        : 'common';

    const logFile = await this.getLatestFile(target);

    fs.appendFile(logFile, logEntry, (err) => {
      if (err) {
        process.stdout.write(`Failed to write log entry: ${err.message}`);
      }
    });
  }

  private async getLatestFile(target = 'common'): Promise<string> {
    const orderedFiles = await this.getLogFiles(target);

    if (orderedFiles.length === 0) {
      return this.createNewLogFile(target);
    }

    const latestFile = orderedFiles[orderedFiles.length - 1] + '.log';

    const stat = await fs.promises.stat(latestFile);

    if (stat.size >= this.maxFileSize) {
      const currentIndex = parseInt(
        path.basename(latestFile).replace(`${target}_`, '').replace('.log', ''),
      );

      if (orderedFiles.length >= this.maxFiles) {
        // Remove oldest log file and shift all remaining log files
        const oldestLogFile = orderedFiles[0] + '.log';

        const isOldestLogExists = await this.fileExists(oldestLogFile);

        if (isOldestLogExists) {
          await fs.promises.unlink(oldestLogFile);
        }

        for (let j = 1; j <= this.maxFiles; j++) {
          if (orderedFiles[j]) {
            await fs.promises.rename(
              orderedFiles[j] + '.log',
              `${this.logDirectory}/${target}_${j - 1}.log`,
            );
          }
        }

        return `${this.logDirectory}/${target}_${currentIndex}.log`;
      }

      return this.createNewLogFile(target, currentIndex + 1);
    }

    return latestFile;
  }

  private async getLogFiles(target: string) {
    // Ensure the log directory exists
    const isDirectory = await this.fileExists(this.logDirectory);

    if (!isDirectory) {
      await fs.promises.mkdir(this.logDirectory, { recursive: true });
    }

    const files = await fs.promises.readdir(this.logDirectory);

    return files
      .sort()
      .map((filename) =>
        path.join(this.logDirectory, filename.replace('.log', '')),
      )
      .filter((filename) => filename.includes(target));
  }

  private createNewLogFile(target: string, index = 0): string {
    return `${this.logDirectory}/${target}_${index}.log`;
  }

  private isLogLevelEnabled(level: LogLevel): boolean {
    return this.logLevels.includes(level);
  }

  private async fileExists(filePath: string) {
    return fs.promises
      .access(filePath, fs.promises.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }
}
