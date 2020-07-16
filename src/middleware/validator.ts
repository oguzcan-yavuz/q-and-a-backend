import { BadRequestException } from '../error/bad-request-exception';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const validator = (schema) => (event: APIGatewayProxyEvent) => {
  const eventWithParsedBody = { ...event, body: JSON.parse(event.body || '{}') };
  const { error } = schema.validate(eventWithParsedBody);

  if (error) {
    throw new BadRequestException(error.message);
  }
};
