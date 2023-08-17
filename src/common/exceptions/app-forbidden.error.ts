import { AppBaseError } from './app-base.error';

export class AppForbiddenError extends AppBaseError {
  constructor(description = 'Authentication error') {
    super('AUTHENTICATION ERROR', description, true);
  }
}
