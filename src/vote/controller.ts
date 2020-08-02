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

export const getVotesOfCurrentUser: APIGatewayProxyHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Vote['meetingId'];
  const userId = '' as Vote['userId']; // TODO: get userId from jwt claim
  const userVotes = await VoteService.getVotesOfCurrentUser({ meetingId, userId });

  return createProxyResult(HttpStatus.OK, userVotes);
};
