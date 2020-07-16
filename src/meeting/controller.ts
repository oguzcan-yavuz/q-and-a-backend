import { APIGatewayProxyHandler } from 'aws-lambda';
import * as MeetingService from './service';
import * as HttpStatus from 'http-status-codes';
import { Meeting } from './Meeting';

export const getMeeting: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters!.id as string;
  const meeting = await MeetingService.getMeeting(id);

  return {
    statusCode: HttpStatus.OK,
    body: JSON.stringify(meeting),
  };
};

export const createMeeting: APIGatewayProxyHandler = async (event) => {
  const meeting = JSON.parse(event.body!) as Omit<Meeting, 'id'>;
  const { id } = await MeetingService.createMeeting(meeting);

  return {
    statusCode: HttpStatus.CREATED,
    body: JSON.stringify({ id }),
  };
};
