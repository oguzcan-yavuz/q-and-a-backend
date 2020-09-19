import { BadRequestException } from '../error/bad-request-exception';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const validate = (
  schema,
  event: APIGatewayProxyEvent
): Omit<APIGatewayProxyEvent, 'body'> & { body: object } => {
  try {
    const eventWithParsedBody = { ...event, body: JSON.parse(event.body || '{}') };
    const { error } = schema.validate(eventWithParsedBody);

    if (error) {
      throw error;
    }

    return eventWithParsedBody;
  } catch (err) {
    throw new BadRequestException(err.message);
  }
};
