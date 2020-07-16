import { HttpException } from './http-exception';
import * as HttpStatus from 'http-status-codes';

export class BadRequestException extends HttpException {
  constructor(public message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
