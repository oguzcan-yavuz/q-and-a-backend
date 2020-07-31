import { Vote } from './Vote';
import * as VoteRepository from './repository';
import * as MeetingService from '../meeting/service';
import * as QuestionService from '../question/service';

export const voteQuestion = async ({
  questionId,
  userId,
  type,
}: Omit<Vote, 'meetingId'>): Promise<Vote> => {
  const { meetingId } = await QuestionService.getQuestion(questionId);
  await MeetingService.getOpenMeeting(meetingId);
  return VoteRepository.voteQuestion({ meetingId, questionId, userId, type });
};

export const getUserVotes = async ({
  meetingId,
  userId,
}: Pick<Vote, 'meetingId' | 'userId'>): Promise<Vote> => {
  return VoteRepository.getUserVotes({ meetingId, userId });
};
