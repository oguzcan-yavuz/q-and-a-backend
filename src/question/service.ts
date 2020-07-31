import { DynamoDBStreamHandler } from "aws-lambda";
import { NotFoundException } from "../error/not-found-exception";
import { Meeting } from "../meeting/Meeting";
import { calculateVoteValue } from "../util";
import { VoteValue } from "../vote/Vote";

import {
  GetQuestionsOfMeetingResponse,
  Question,
  QuestionBody,
} from "./Question";
import * as QuestionRepository from "./repository";

export const getQuestion = async (id: Question["id"]): Promise<Question> => {
  const question = await QuestionRepository.getQuestion(id);

  if (!question) {
    throw new NotFoundException();
  }

  return question;
};

export const createQuestion = (
  questionBody: QuestionBody
): Promise<Question> => {
  return QuestionRepository.createQuestion(questionBody);
};

export const getQuestionsOfMeeting = (
  meetingId: Meeting["id"]
): Promise<GetQuestionsOfMeetingResponse> => {
  return QuestionRepository.getQuestionsOfMeeting(meetingId);
};

export const updateQuestionVote: DynamoDBStreamHandler = (event) => {
  event.Records.map((record) => {
    const OldVoteType: number = record.dynamodb!.OldImage?.type!.N!;
    const NewVoteType: number = record.dynamodb!.NewImage?.type!.N!;
    const calculatedVoteValue: number = calculateVoteValue(
      OldVoteType,
      NewVoteType
    );
  });
};
