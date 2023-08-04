import { AppBaseError } from './app-base.error';

export class AppNotFoundError extends AppBaseError {
  constructor(description = 'Not found') {
    super('NOT FOUND', description, true);
  }
}
