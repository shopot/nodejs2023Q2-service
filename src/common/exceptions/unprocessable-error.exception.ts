import { BaseErrorException } from './base-error.exception';

export class UnprocessableErrorException extends BaseErrorException {
  constructor(description = 'Unprocessable Entity') {
    super('Unprocessable Entity', description, true);
  }
}
