import { Meeting } from '../meeting/Meeting';
import { GetQuestionsOfMeetingResponse, Question, QuestionBody } from './Question';
import * as QuestionRepository from './repository';

export const createQuestion = (questionBody: QuestionBody): Promise<Question> => {
  return QuestionRepository.createQuestion(questionBody);
};

export const getQuestionsOfMeeting = (
  meetingId: Meeting['id']
): Promise<GetQuestionsOfMeetingResponse> => {
  return QuestionRepository.getQuestionsOfMeeting(meetingId);
};
