import { Question } from '../question/Question';
import { Meeting } from '../meeting/Meeting';

export enum VoteType {
  Up = 1,
  Down = -1,
  Revert = 0,
}

export type Vote = {
  userId: string;
  meetingId: Meeting['id'];
  questionId: Question['id'];
  type: VoteType;
};
