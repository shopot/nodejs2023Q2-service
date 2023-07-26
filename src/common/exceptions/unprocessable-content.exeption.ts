import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableContentException extends HttpException {
  constructor() {
    super('Not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
