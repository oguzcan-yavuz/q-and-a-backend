import { BadRequestException } from '../error/bad-request-exception';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const validate = (schema, event: APIGatewayProxyEvent): void => {
  try {
    const eventWithParsedBody = { ...event, body: JSON.parse(event.body || '{}') };
    const { error } = schema.validate(eventWithParsedBody);

    if (error) {
      throw error;
    }
  } catch (err) {
    throw new BadRequestException(err.message);
  }
};
