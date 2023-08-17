import { AppBaseError } from './app-base.error';

export class AppBadRequestError extends AppBaseError {
  constructor(description = 'Bad Request') {
    super('BAD REQUEST', description, true);
  }
}
