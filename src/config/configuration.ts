import {
  DEFAULT_APP_PORT,
  DEFAULT_LOG_LEVEL,
  DEFAULT_MAX_FILE_SIZE,
  DEFAULT_MAX_FILES,
} from '../common/constants';

export default () => ({
  port: parseInt(process.env.PORT, 10) || DEFAULT_APP_PORT,

  logger: {
    maxFiles: process.env.LOG_MAX_FILES
      ? parseInt(process.env.LOG_MAX_FILES, 10)
      : DEFAULT_MAX_FILES,

    maxFileSize: process.env.LOG_MAX_FILE_SIZE
      ? parseInt(process.env.LOG_MAX_FILE_SIZE, 10) * 1024 // in Kb
      : DEFAULT_MAX_FILE_SIZE * 1024,

    levels: process.env.LOG_LEVELS
      ? String(process.env.LOG_LEVELS).trim().split(' ')
      : DEFAULT_LOG_LEVEL,
  },

  auth: {
    accessSecret: process.env.JWT_SECRET_KEY || '',
    accessExpiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    refreshSecret: process.env.JWT_SECRET_REFRESH_KEY || '',
    refreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '1h',
  },
});
