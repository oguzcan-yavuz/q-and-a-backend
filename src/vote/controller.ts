import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import * as VoteService from './service';
import * as HttpStatus from 'http-status-codes';
import { Vote } from './Vote';
import { createProxyResult } from '../util';

export const voteQuestion: APIGatewayProxyWithCognitoAuthorizerHandler = async (event) => {
  const questionId = event.pathParameters!.questionId as Vote['questionId'];
  const { type } = JSON.parse(event.body!) as Pick<Vote, 'type'>;
  const {
    requestContext: {
      authorizer: {
        claims: { sub: userId },
      },
    },
  } = event;
  const voteResponse = await VoteService.voteQuestion({
    questionId,
    userId,
    type,
  });

  return createProxyResult(HttpStatus.OK, voteResponse);
};

export const getVotesOfCurrentUser: APIGatewayProxyWithCognitoAuthorizerHandler = async (event) => {
  const meetingId = event.pathParameters!.meetingId as Vote['meetingId'];
  const {
    requestContext: {
      authorizer: {
        claims: { sub: userId },
      },
    },
  } = event;
  const userVotes = await VoteService.getVotesOfCurrentUser({ meetingId, userId });

  return createProxyResult(HttpStatus.OK, userVotes);
};
