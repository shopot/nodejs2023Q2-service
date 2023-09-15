import {
  DEFAULT_APP_PORT,
  DEFAULT_MAX_FILE_SIZE,
  DEFAULT_MAX_FILES,
  LOG_LEVELS_ARRAY,
} from '../common/constants';

let logLevelIndex = parseInt(process.env.LOG_LEVEL, 10);

if (
  !Number.isInteger(logLevelIndex) ||
  logLevelIndex < 0 ||
  logLevelIndex > 4
) {
  logLevelIndex = 2;
}

const configLogLevels = LOG_LEVELS_ARRAY.slice(0, logLevelIndex + 1);

export default () => ({
  port: parseInt(process.env.PORT, 10) || DEFAULT_APP_PORT,

  logger: {
    maxFiles: process.env.LOG_MAX_FILES
      ? parseInt(process.env.LOG_MAX_FILES, 10)
      : DEFAULT_MAX_FILES,

    maxFileSize: process.env.LOG_MAX_FILE_SIZE
      ? parseInt(process.env.LOG_MAX_FILE_SIZE, 10) * 1000 // in Kb
      : DEFAULT_MAX_FILE_SIZE * 1000,

    levels: configLogLevels,
  },

  auth: {
    accessSecret: process.env.JWT_SECRET_KEY || '',
    accessExpiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    refreshSecret: process.env.JWT_SECRET_REFRESH_KEY || '',
    refreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '1h',
  },
});
