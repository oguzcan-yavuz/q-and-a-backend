import { Container } from 'typedi';
import { VoteController } from './controller';
import { voteQuestionSchema, getVotesOfCurrentUserSchema } from './schema';
import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import { validate } from '../util/validate';

const voteController = Container.get(VoteController);

export const voteQuestion: APIGatewayProxyWithCognitoAuthorizerHandler = (event) => {
  validate(voteQuestionSchema, event);

  return voteController.voteQuestion(event);
};

export const getVotesOfCurrentUser: APIGatewayProxyWithCognitoAuthorizerHandler = (event) => {
  validate(getVotesOfCurrentUserSchema, event);

  return voteController.getVotesOfCurrentUser(event);
};
