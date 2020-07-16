import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import MeetingService from './service';
import HttpStatus = require('http-status-codes');
import { Meeting } from './Meeting';
import MeetingSchema from './schema';

export const getMeeting = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { value: req } = MeetingSchema.getMeeting.validate(event);
    const {
      pathParameters: { id },
    } = req;
    const meeting = await MeetingService.getMeeting(id);

    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(meeting),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({}),
    };
  }
};

export const createMeeting = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { value: req, error } = MeetingSchema.createMeeting.validateAsync(event);
    console.log('req:', req);
    console.log('error:', error);
    const meeting = req.body as Omit<Meeting, 'id'>;
    const { id } = await MeetingService.createMeeting(meeting);

    return {
      statusCode: HttpStatus.CREATED,
      body: JSON.stringify({ id }),
    };
  } catch (error) {
    console.error('wtfaf', error);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({}),
    };
  }
};
