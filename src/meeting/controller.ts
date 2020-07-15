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
    const meeting: Meeting = await MeetingService.getMeeting(id);

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
