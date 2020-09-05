import { Container } from 'typedi';
import { QuestionController } from './controller';
import { APIGatewayProxyWithCognitoAuthorizerHandler, DynamoDBStreamHandler } from 'aws-lambda';

const questionController = Container.get(QuestionController);

export const createQuestion: APIGatewayProxyWithCognitoAuthorizerHandler = (event) =>
  questionController.createQuestion(event);

export const updateVoteCountsOfQuestions: DynamoDBStreamHandler = (event) =>
  questionController.updateVoteCountsOfQuestions(event);
