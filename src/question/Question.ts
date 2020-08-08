import { Meeting } from '../meeting/Meeting';

export const enum QuestionStatus {
  Deleted = 'deleted',
}

export type Question = {
  id: string;
  userId: string;
  meetingId: Meeting['id'];
  content: string;
  voteCount: number;
  createdAt: number;
};

export type QuestionBody = Pick<Question, 'meetingId' | 'content'>;
export type QuestionBodyWithUserId = QuestionBody & Pick<Question, 'userId'>;
export type GetQuestionsOfMeetingResponse = Omit<Question, 'userId' | 'meetingId' | 'status'>[];
