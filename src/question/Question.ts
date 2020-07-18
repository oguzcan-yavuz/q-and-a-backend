import { Meeting } from '../meeting/Meeting';

const enum QuestionStatus {
  Deleted = 'deleted',
}

export type Question = {
  id: string;
  userId: string;
  meetingId: Pick<Meeting, 'id'>;
  content: string;
  voteCount: number;
  status?: QuestionStatus;
  createdAt: number;
};

export type QuestionBody = Omit<Question, 'id' | 'voteCount' | 'status' | 'createdAt'>;
export type CreateQuestionResponse = Omit<Question, 'userId' | 'meetingId' | 'status'>;
export type GetQuestionsOfMeetingResponse = Omit<Question, 'userId' | 'meetingId' | 'status'>[];
