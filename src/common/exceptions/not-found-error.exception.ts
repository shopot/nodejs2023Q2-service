import { BaseErrorException } from './base-error.exception';

export class NotFoundErrorException extends BaseErrorException {
  constructor(description = 'Not found') {
    super('NOT FOUND', description, true);
  }
}
