import { APIGatewayProxyHandler, DynamoDBStreamHandler } from 'aws-lambda';
import * as HttpStatus from 'http-status-codes';
import { createProxyResult } from '../util';
import { CreateQuestionResponse, QuestionBody, Question } from './Question';
import * as QuestionService from './service';

export const createQuestion: APIGatewayProxyHandler = async (event) => {
  const questionBody = JSON.parse(event.body!) as QuestionBody;
  const { id, content, voteCount, createdAt } = await QuestionService.createQuestion(questionBody);
  const questionResponse: CreateQuestionResponse = {
    id,
    content,
    voteCount,
    createdAt,
  };

  return createProxyResult(HttpStatus.CREATED, questionResponse);
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
