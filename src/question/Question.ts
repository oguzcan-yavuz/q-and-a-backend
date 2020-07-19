import { Meeting } from '../meeting/Meeting';

export type Question = {
  id: string;
  userId: string;
  meetingId: Pick<Meeting, 'id'>;
  content: string;
  voteCount: number;
  createdAt: number;
};

export type QuestionBody = Omit<Question, 'id' | 'voteCount' | 'createdAt'>;
export type CreateQuestionResponse = Omit<Question, 'userId' | 'meetingId'>;
export type GetQuestionsOfMeetingResponse = Omit<Question, 'userId' | 'meetingId'>[];
