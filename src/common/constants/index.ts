import { LogLevel } from '@nestjs/common';

export const DEFAULT_APP_PORT = 4000;

export const SALT_OR_ROUNDS = 10;

export const DEFAULT_MAX_FILE_SIZE = 100; // 100Kb

export const DEFAULT_MAX_FILES = 5;

// 'log' | 'error' | 'warn' | 'debug' | 'verbose'
export const LOG_LEVELS_ARRAY: LogLevel[] = [
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
];
