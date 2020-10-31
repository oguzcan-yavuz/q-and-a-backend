import { HttpException } from './http-exception';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class NotFoundException extends HttpException {
  constructor() {
    const statusCode = StatusCodes.NOT_FOUND;
    const message = getReasonPhrase(statusCode);
    super(statusCode, message);
  }
}
