import { NotFoundException } from '../common/error/not-found-exception';
import { Meeting } from '../meeting/Meeting';
import { calculateVoteAddition } from '../common/util';
import { GetQuestionsOfMeetingResponse, Question, QuestionBodyWithUserId } from './Question';
import { QuestionRepository } from './repository';
import { VoteType } from '../vote/Vote';
import { Service } from 'typedi';

type VoteTypeChange = {
  questionId: Question['id'];
  oldVoteType: VoteType;
  newVoteType: VoteType;
};

@Service()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async getQuestion(questionId: Question['id']): Promise<Question> {
    const question = await this.questionRepository.getQuestion(questionId);

    if (!question) {
      throw new NotFoundException();
    }

    return question;
  }

  createQuestion(question: QuestionBodyWithUserId): Promise<Pick<Question, 'id'>> {
    return this.questionRepository.createQuestion(question);
  }

  getQuestionsOfMeeting(meetingId: Meeting['id']): Promise<GetQuestionsOfMeetingResponse> {
    return this.questionRepository.getQuestionsOfMeeting(meetingId);
  }

  updateVoteCountsOfQuestions(voteTypeChanges: VoteTypeChange[]): Promise<void[]> {
    return Promise.all(
      voteTypeChanges.map(({ questionId, oldVoteType, newVoteType }) => {
        const addition = calculateVoteAddition(oldVoteType, newVoteType);

        return this.questionRepository.updateVoteCount(questionId, addition);
      })
    );
  }
}
