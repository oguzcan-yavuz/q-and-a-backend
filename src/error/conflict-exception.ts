import { HttpException } from './http-exception';
import * as HttpStatus from 'http-status-codes';

export class ConflictException extends HttpException {
  constructor() {
    const statusCode = HttpStatus.CONFLICT;
    const message = HttpStatus.getStatusText(statusCode);
    super(statusCode, message);
  }
}
