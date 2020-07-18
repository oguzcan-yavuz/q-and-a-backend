type Options = {
  winnerCount?: number;
  maxVoteCountPerUser?: number;
  maxQuestionCountPerUser?: number;
  electionEndDate?: Date;
  plannedAnswerDate?: Date;
};

export const enum MeetingStatus {
  Open = 'open',
  Deleted = 'deleted',
  Closed = 'closed',
}

export type Meeting = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  options?: Options;
  status: MeetingStatus;
};

export type MeetingBody = Omit<Meeting, 'id' | 'status'>;
