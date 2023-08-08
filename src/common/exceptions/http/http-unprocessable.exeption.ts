import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpUnprocessableException extends HttpException {
  constructor() {
    super('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
