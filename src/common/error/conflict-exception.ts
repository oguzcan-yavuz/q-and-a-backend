import { HttpException } from './http-exception';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class ConflictException extends HttpException {
  constructor() {
    const statusCode = StatusCodes.CONFLICT;
    const message = getReasonPhrase(statusCode);
    super(statusCode, message);
  }
}
