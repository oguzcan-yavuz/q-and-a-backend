import { NotFoundException } from '../error/not-found-exception';
import { Meeting } from '../meeting/Meeting';
import { calculateVoteAddition } from '../util';

import { GetQuestionsOfMeetingResponse, Question, QuestionBodyWithUserId } from './Question';
import * as QuestionRepository from './repository';
import { VoteType } from '../vote/Vote';

export const getQuestion = async (id: Question['id']): Promise<Question> => {
  const question = await QuestionRepository.getQuestion(id);

  if (!question) {
    throw new NotFoundException();
  }

  return question;
};

export const createQuestion = (question: QuestionBodyWithUserId): Promise<Question> => {
  return QuestionRepository.createQuestion(question);
};

export const getQuestionsOfMeeting = (
  meetingId: Meeting['id']
): Promise<GetQuestionsOfMeetingResponse> => {
  return QuestionRepository.getQuestionsOfMeeting(meetingId);
};

type VoteTypeChange = {
  questionId: Question['id'];
  oldVoteType: VoteType;
  newVoteType: VoteType;
};

export const updateVoteCountsOfQuestions = (voteTypeChanges: VoteTypeChange[]): Promise<void[]> =>
  Promise.all(
    voteTypeChanges.map(({ questionId, oldVoteType, newVoteType }) => {
      const addition = calculateVoteAddition(oldVoteType, newVoteType);

      return QuestionRepository.updateVoteCount(questionId, addition);
    })
  );
