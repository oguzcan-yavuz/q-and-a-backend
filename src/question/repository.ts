import { v4 as uuidv4 } from 'uuid';
import docClient from '../util/document-client';
import { Meeting } from '../meeting/Meeting';
import { GetQuestionsOfMeetingResponse, Question, QuestionBody } from './Question';

const TableName = process.env.QUESTIONS_TABLE as string;

export const createQuestion = async (question: QuestionBody): Promise<Question> => {
  const id = uuidv4();
  const questionDocument = {
    id,
    voteCount: 0,
    createdAt: Date.now(),
    ...question,
  };
  const params = {
    TableName,
    Item: questionDocument,
  };

  await docClient.put(params).promise();

  return questionDocument;
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
