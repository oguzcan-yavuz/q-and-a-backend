import {
  DynamoDBStreamEvent,
  APIGatewayProxyResult,
  APIGatewayProxyWithCognitoAuthorizerEvent,
} from 'aws-lambda';
import * as HttpStatus from 'http-status-codes';
import { createProxyResult } from '../util';
import { QuestionBody } from './Question';
import { QuestionService } from './service';
import { validate } from '../util/validate';
import { createQuestionSchema } from './schema';
import { Service } from 'typedi';

@Service()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  async createQuestion(
    event: APIGatewayProxyWithCognitoAuthorizerEvent
  ): Promise<APIGatewayProxyResult> {
    validate(createQuestionSchema, event);

    const questionBody = JSON.parse(event.body!) as QuestionBody;
    const {
      requestContext: {
        authorizer: {
          claims: { sub: userId },
        },
      },
    } = event;
    const { id } = await this.questionService.createQuestion({ ...questionBody, userId });

    return createProxyResult(HttpStatus.CREATED, { id });
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
