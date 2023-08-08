import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
