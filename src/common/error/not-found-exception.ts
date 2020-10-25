import { HttpException } from './http-exception';
import * as HttpStatus from 'http-status-codes';

export class NotFoundException extends HttpException {
  constructor() {
    const statusCode = HttpStatus.NOT_FOUND;
    const message = HttpStatus.getStatusText(statusCode);
    super(statusCode, message);
  }
}
