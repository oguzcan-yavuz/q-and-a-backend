import { HttpException } from '../error/http-exception';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as HttpStatus from 'http-status-codes';

type PreviousHandlerError = {
  prev: HttpException | Error;
};

export const errorHandler = (
  event: APIGatewayProxyEvent,
  { prev: error }: PreviousHandlerError
) => {
  let statusCode;
  if (error instanceof HttpException) {
    statusCode = error.statusCode;
  } else {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    console.error(error);
  }

  return {
    statusCode,
    body: JSON.stringify({ message: error.message }),
  };
};
