import { Vote } from './Vote';
import { VoteRepository } from './repository';
import { MeetingService } from '../meeting/service';
import { QuestionService } from '../question/service';
import { Service } from 'typedi';

@Service()
export class VoteService {
  constructor(
    private readonly voteRepository: VoteRepository,
    private readonly meetingService: MeetingService,
    private readonly questionService: QuestionService
  ) {}
  async voteQuestion({ questionId, userId, type }: Omit<Vote, 'meetingId'>): Promise<Vote> {
    const { meetingId } = await this.questionService.getQuestion(questionId);
    await this.meetingService.getOpenMeeting(meetingId);

    return this.voteRepository.voteQuestion({ meetingId, questionId, userId, type });
  }

  async getVotesOfCurrentUser({
    meetingId,
    userId,
  }: Pick<Vote, 'meetingId' | 'userId'>): Promise<Vote[]> {
    return this.voteRepository.getVotesOfCurrentUser({ meetingId, userId });
  }
}
