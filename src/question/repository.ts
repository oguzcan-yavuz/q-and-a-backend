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
const TableName = `${process.env.QUESTIONS_TABLE}-${process.env.NODE_ENV}`;

export const getQuestion = async (questionId: Question['id']): Promise<Question | undefined> => {
  const params = {
    TableName,
    Key: { id: questionId },
  };
  const { Item: question } = await docClient.get(params).promise();

  return question as Question;
};

export const createQuestion = async (
  question: QuestionBodyWithUserId
): Promise<Pick<Question, 'id'>> => {
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
};

export const getQuestionsOfMeeting = async (
  meetingId: Meeting['id']
): Promise<GetQuestionsOfMeetingResponse> => {
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
};

export const updateVoteCount = async (
  questionId: Question['id'],
  addition: number
): Promise<void> => {
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
};
