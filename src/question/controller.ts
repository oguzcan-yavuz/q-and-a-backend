import { DynamoDBStreamHandler, APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import * as HttpStatus from 'http-status-codes';
import { createProxyResult } from '../util';
import { QuestionBody } from './Question';
import * as QuestionService from './service';

export const createQuestion: APIGatewayProxyWithCognitoAuthorizerHandler = async (event) => {
  const questionBody = JSON.parse(event.body!) as QuestionBody;
  const {
    requestContext: {
      authorizer: {
        claims: { sub: userId },
      },
    },
  } = event;
  const { id } = await QuestionService.createQuestion({ ...questionBody, userId });

  return createProxyResult(HttpStatus.CREATED, { id });
};

export const updateVoteCountsOfQuestions: DynamoDBStreamHandler = async (event) => {
  const records = event.Records.map((record) => {
    const questionId = (record.dynamodb!.OldImage || record.dynamodb!.NewImage)!.questionId!.S!;
    const oldVoteType = parseInt(record.dynamodb!.OldImage?.type!.N!, 10);
    const newVoteType = parseInt(record.dynamodb!.NewImage?.type!.N!, 10);

    return { questionId, oldVoteType, newVoteType };
  });

  await QuestionService.updateVoteCountsOfQuestions(records);
};
