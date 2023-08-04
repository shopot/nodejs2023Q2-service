import { AppBaseError } from './app-base.error';

export class AppUnprocessableError extends AppBaseError {
  constructor(description = 'Unprocessable Entity') {
    super('Unprocessable Entity', description, true);
  }
}
