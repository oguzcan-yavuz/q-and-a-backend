type Options = {
  winnerCount?: number;
  maxVoteCountPerUser?: number;
  maxQuestionCountPerUser?: number;
  electionEndDate?: Date;
  plannedAnswerDate?: Date;
};

export type Meeting = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  options?: Options;
};
