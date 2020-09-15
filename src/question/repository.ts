import { v4 as uuidv4 } from 'uuid';
import docClient from '../util/document-client';
import { Meeting } from '../meeting/Meeting';
import {
  GetQuestionsOfMeetingResponse,
  Question,
  QuestionStatus,
  QuestionBodyWithUserId,
} from './Question';
import { NotFoundException } from '../error/not-found-exception';
import { Service } from 'typedi';
const TableName = `${process.env.QUESTIONS_TABLE}-${process.env.NODE_ENV}`;

@Service()
export class QuestionRepository {
  async getQuestion(questionId: Question['id']): Promise<Question | undefined> {
    const params = {
      TableName,
      Key: { id: questionId },
    };
    const { Item: question } = await docClient.get(params).promise();

    return question as Question;
  }

  async createQuestion(question: QuestionBodyWithUserId): Promise<Pick<Question, 'id'>> {
    const questionId = uuidv4();
    const questionDocument = {
      id: questionId,
      voteCount: 0,
      createdAt: Date.now(),
      ...question,
    };
    const params = {
      TableName,
      Item: questionDocument,
    };

    await docClient.put(params).promise();

    return { id: questionId };
  }

  async getQuestionsOfMeeting(meetingId: Meeting['id']): Promise<GetQuestionsOfMeetingResponse> {
    const params = {
      TableName,
      IndexName: 'meetingId-id-index',
      KeyConditionExpression: 'meetingId = :meetingId',
      ExpressionAttributeValues: {
        ':meetingId': meetingId,
      },
      ProjectionExpression: 'id, content, voteCount, createdAt',
    };

    const { Items: questions = [] } = await docClient.query(params).promise();

    return questions as GetQuestionsOfMeetingResponse;
  }

  async updateVoteCount(questionId: Question['id'], addition: number): Promise<void> {
    try {
      const params = {
        TableName,
        Key: { id: questionId },
        ConditionExpression: 'attribute_exists(id) AND #status <> :status',
        UpdateExpression: 'ADD voteCount :addition',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': QuestionStatus.Deleted,
          ':addition': addition,
        },
      };

      await docClient.update(params).promise();
    } catch (error) {
      throw error.code === 'ConditionalCheckFailedException' ? new NotFoundException() : error;
    }
  }
}
