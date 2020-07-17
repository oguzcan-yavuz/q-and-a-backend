import { APIGatewayProxyResult } from 'aws-lambda';

export const createProxyResult = (statusCode: number, body: object): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
});
