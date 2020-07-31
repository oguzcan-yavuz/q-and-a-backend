import { APIGatewayProxyHandler } from 'aws-lambda';
import * as VoteService from './service';
import * as HttpStatus from 'http-status-codes';
import { Vote } from './Vote';
import { createProxyResult } from '../util';

export const voteQuestion: APIGatewayProxyHandler = async (event) => {
  const questionId = event.pathParameters!.questionId as Vote['questionId'];
  const { type, userId } = JSON.parse(event.body!) as Pick<Vote, 'type' | 'userId'>;
  const voteResponse = await VoteService.voteQuestion({
    questionId,
    userId,
    type,
  });

  return createProxyResult(HttpStatus.OK, voteResponse);
};

export const getUserVotes: APIGatewayProxyHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Vote['meetingId'];
  const userId = event.pathParameters!.userId as Vote['userId'];

  const userVotes = await VoteService.getUserVotes({ meetingId, userId });
  return createProxyResult(HttpStatus.OK, userVotes);
};
