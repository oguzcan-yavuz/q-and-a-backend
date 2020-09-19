import { APIGatewayProxyWithCognitoAuthorizerEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MeetingService } from './service';
import * as HttpStatus from 'http-status-codes';
import { Meeting, MeetingBody } from './Meeting';
import { createProxyResult } from '../common/util';
import { validate } from '../common/util/validate';
import {
  getMeetingSchema,
  createMeetingSchema,
  deleteMeetingSchema,
  updateMeetingSchema,
  getQuestionsOfMeetingSchema,
} from './schema';
import { Service } from 'typedi';

@Service()
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  async getMeeting(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(getMeetingSchema, event);
    const meetingId = eventWithParsedBody.pathParameters!.meetingId as Meeting['id'];
    const meeting = await this.meetingService.getMeeting(meetingId);

    return createProxyResult(HttpStatus.OK, meeting);
  }

  async createMeeting(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(createMeetingSchema, event);
    const meeting = eventWithParsedBody.body! as MeetingBody;
    const { id } = await this.meetingService.createMeeting(meeting);

    return createProxyResult(HttpStatus.CREATED, { id });
  }

  async deleteMeeting(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(deleteMeetingSchema, event);
    const meetingId = eventWithParsedBody.pathParameters!.meetingId as Meeting['id'];
    await this.meetingService.deleteMeeting(meetingId);

    return createProxyResult(HttpStatus.NO_CONTENT, {});
  }

  async updateMeeting(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(updateMeetingSchema, event);
    const meetingId = eventWithParsedBody.pathParameters!.meetingId as Meeting['id'];
    const meeting = JSON.parse(event.body!) as Partial<MeetingBody>;
    await this.meetingService.updateMeeting(meetingId, meeting);

    return createProxyResult(HttpStatus.NO_CONTENT, {});
  }

  async getQuestionsOfMeeting(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(getQuestionsOfMeetingSchema, event);
    const meetingId = eventWithParsedBody.pathParameters!.meetingId as Meeting['id'];
    const questions = await this.meetingService.getQuestionsOfMeeting(meetingId);

    return createProxyResult(HttpStatus.OK, questions);
  }
}
