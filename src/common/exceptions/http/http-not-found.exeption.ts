import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpNotFoundException extends HttpException {
  constructor() {
    super('Not found', HttpStatus.NOT_FOUND);
  }
}
