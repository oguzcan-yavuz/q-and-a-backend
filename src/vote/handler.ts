import { Container } from 'typedi';
import { VoteController } from './controller';
import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';

const voteController = Container.get(VoteController);

export const voteQuestion: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  voteController.voteQuestion(event);

export const getVotesOfCurrentUser: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  voteController.getVotesOfCurrentUser(event);
