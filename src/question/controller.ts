import {
  APIGatewayProxyHandler,
  Handler,
  DynamoDBStreamEvent,
  DynamoDBStreamHandler,
} from "aws-lambda";
import * as HttpStatus from "http-status-codes";
import { createProxyResult } from "../util";
import { CreateQuestionResponse, QuestionBody } from "./Question";
import * as QuestionService from "./service";

export const createQuestion: APIGatewayProxyHandler = async (event) => {
  const questionBody = JSON.parse(event.body!) as QuestionBody;
  const {
    id,
    content,
    voteCount,
    createdAt,
  } = await QuestionService.createQuestion(questionBody);
  const questionResponse: CreateQuestionResponse = {
    id,
    content,
    voteCount,
    createdAt,
  };

  return createProxyResult(HttpStatus.CREATED, questionResponse);
};

export const updateQuestionVote: DynamoDBStreamHandler = async (event) => {
  await QuestionService.updateQuestionVote(event);
};
