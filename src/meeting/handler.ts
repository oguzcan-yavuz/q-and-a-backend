import { Container } from 'typedi';
import { APIGatewayProxyWithCognitoAuthorizerHandler, DynamoDBStreamHandler } from 'aws-lambda';
import { MeetingController } from './controller';

const meetingController = Container.get(MeetingController);

export const getMeeting: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  meetingController.getMeeting(event);

export const createMeeting: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  meetingController.createMeeting(event);

export const deleteMeeting: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  meetingController.deleteMeeting(event);

export const updateMeeting: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  meetingController.updateMeeting(event);

export const getQuestionsOfMeeting: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  meetingController.getQuestionsOfMeeting(event);
