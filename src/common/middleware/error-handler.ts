import { HttpException } from '../error/http-exception';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { createProxyResult } from '../util';

type PreviousHandlerError = {
  prev: HttpException | Error;
};

export const errorHandler = (
  event: APIGatewayProxyEvent,
  { prev: error }: PreviousHandlerError
): APIGatewayProxyResult => {
  let statusCode;
  if (error instanceof HttpException) {
    statusCode = error.statusCode;
  } else {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.error(error);
  }

  return createProxyResult(statusCode, { message: error.message });
};
