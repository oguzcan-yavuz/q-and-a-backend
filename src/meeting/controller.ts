import { APIGatewayProxyHandler } from 'aws-lambda';
import * as MeetingService from './service';
import * as HttpStatus from 'http-status-codes';
import { Meeting, MeetingBody } from './Meeting';
import { createProxyResult } from '../util';

export const getMeeting: APIGatewayProxyHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Meeting['id'];
  const meeting = await MeetingService.getMeeting(meetingId);

  return createProxyResult(HttpStatus.OK, meeting);
};

export const createMeeting: APIGatewayProxyHandler = async (event) => {
  const meeting = JSON.parse(event.body!) as MeetingBody;
  const { id } = await MeetingService.createMeeting(meeting);

  return createProxyResult(HttpStatus.CREATED, { id });
};

export const deleteMeeting: APIGatewayProxyHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Meeting['id'];
  await MeetingService.deleteMeeting(meetingId);

  return createProxyResult(HttpStatus.NO_CONTENT, {});
};

export const updateMeeting: APIGatewayProxyHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Meeting['id'];
  const meeting = JSON.parse(event.body!) as Partial<MeetingBody>;
  await MeetingService.updateMeeting(meetingId, meeting);

  return createProxyResult(HttpStatus.NO_CONTENT, {});
};

export const getQuestionsOfMeeting: APIGatewayProxyHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Meeting['id'];
  const questions = await MeetingService.getQuestionsOfMeeting(meetingId);

  return createProxyResult(HttpStatus.OK, questions);
};
