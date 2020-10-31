import { HttpException } from './http-exception';
import { StatusCodes } from 'http-status-codes';

export class BadRequestException extends HttpException {
  constructor(public message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
