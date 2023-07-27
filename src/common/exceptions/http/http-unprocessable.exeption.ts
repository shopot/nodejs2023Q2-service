import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpUnprocessableException extends HttpException {
  constructor() {
    super('Not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
