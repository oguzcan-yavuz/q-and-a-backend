import { NotFoundException } from '../error/not-found-exception';
import { Meeting } from '../meeting/Meeting';
import { calculateVoteAddition } from '../util';
import { GetQuestionsOfMeetingResponse, Question, QuestionBodyWithUserId } from './Question';
import * as QuestionRepository from './repository';
import { VoteType } from '../vote/Vote';
import { Service } from 'typedi';

type VoteTypeChange = {
  questionId: Question['id'];
  oldVoteType: VoteType;
  newVoteType: VoteType;
};

@Service()
export class QuestionService {
  async getQuestion(questionId: Question['id']): Promise<Question> {
    const question = await QuestionRepository.getQuestion(questionId);

    if (!question) {
      throw new NotFoundException();
    }

    return question;
  }

  createQuestion(question: QuestionBodyWithUserId): Promise<Pick<Question, 'id'>> {
    return QuestionRepository.createQuestion(question);
  }

  getQuestionsOfMeeting(meetingId: Meeting['id']): Promise<GetQuestionsOfMeetingResponse> {
    return QuestionRepository.getQuestionsOfMeeting(meetingId);
  }

  updateVoteCountsOfQuestions(voteTypeChanges: VoteTypeChange[]): Promise<void[]> {
    return Promise.all(
      voteTypeChanges.map(({ questionId, oldVoteType, newVoteType }) => {
        const addition = calculateVoteAddition(oldVoteType, newVoteType);

        return QuestionRepository.updateVoteCount(questionId, addition);
      })
    );
  }
}
