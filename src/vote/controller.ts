import { APIGatewayProxyWithCognitoAuthorizerEvent, APIGatewayProxyResult } from 'aws-lambda';
import { VoteService } from './service';
import { StatusCodes } from 'http-status-codes';
import { Vote } from './Vote';
import { createProxyResult } from '../common/util';
import { Service } from 'typedi';
import { validate } from '../common/util/validate';
import { voteQuestionSchema, getVotesOfCurrentUserSchema } from './schema';

@Service()
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  async voteQuestion(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(voteQuestionSchema, event);
    const questionId = eventWithParsedBody.pathParameters!.questionId as Vote['questionId'];
    const { type } = JSON.parse(event.body!) as Pick<Vote, 'type'>;
    const {
      requestContext: {
        authorizer: {
          claims: { sub: userId },
        },
      },
    } = event;
    const voteResponse = await this.voteService.voteQuestion({
      questionId,
      userId,
      type,
    });

    return createProxyResult(StatusCodes.OK, voteResponse);
  }

  async getVotesOfCurrentUser(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(getVotesOfCurrentUserSchema, event);
    const meetingId = eventWithParsedBody.pathParameters!.meetingId as Vote['meetingId'];
    const {
      requestContext: {
        authorizer: {
          claims: { sub: userId },
        },
      },
    } = event;
    const userVotes = await this.voteService.getVotesOfCurrentUser({ meetingId, userId });

    return createProxyResult(StatusCodes.OK, userVotes);
  }
}
