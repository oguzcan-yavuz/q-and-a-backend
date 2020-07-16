import { HttpException } from '../error/http-exception';
import { APIGatewayProxyEvent } from 'aws-lambda';

type PreviousHandlerError = {
  prev: HttpException | Error;
};

export const errorHandler = (
  event: APIGatewayProxyEvent,
  { prev: error }: PreviousHandlerError
) => {
  console.error(error);
  const statusCode = error instanceof HttpException ? error.statusCode : 500;

  return {
    statusCode,
    body: JSON.stringify({ message: error.message }),
  };
};
