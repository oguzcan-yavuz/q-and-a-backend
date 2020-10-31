import {
  DynamoDBStreamEvent,
  APIGatewayProxyResult,
  APIGatewayProxyWithCognitoAuthorizerEvent,
} from 'aws-lambda';
import { createProxyResult } from '../common/util';
import { StatusCodes } from 'http-status-codes';
import { QuestionBody } from './Question';
import { QuestionService } from './service';
import { validate } from '../common/util/validate';
import { createQuestionSchema } from './schema';
import { Service } from 'typedi';

@Service()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  async createQuestion(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    const eventWithParsedBody = validate(createQuestionSchema, event);
    const questionBody = eventWithParsedBody.body! as QuestionBody;
    const {
      requestContext: {
        authorizer: {
          claims: { sub: userId },
        },
      },
    } = event;
    const { id } = await this.questionService.createQuestion({ ...questionBody, userId });

    return createProxyResult(StatusCodes.CREATED, { id });
  }

  async updateVoteCountsOfQuestions(event: DynamoDBStreamEvent): Promise<void> {
    const records = event.Records.map((record) => {
      const questionId = (record.dynamodb!.OldImage || record.dynamodb!.NewImage)!.questionId!.S!;
      const oldVoteType = parseInt(record.dynamodb!.OldImage?.type!.N!, 10);
      const newVoteType = parseInt(record.dynamodb!.NewImage?.type!.N!, 10);

      return { questionId, oldVoteType, newVoteType };
    });

    await this.questionService.updateVoteCountsOfQuestions(records);
  }
}
