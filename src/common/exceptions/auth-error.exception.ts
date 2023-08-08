import { BaseErrorException } from './base-error.exception';

export class AuthErrorException extends BaseErrorException {
  constructor(description = 'Authentication error') {
    super('AUTHENTICATION ERROR', description, true);
  }
}
