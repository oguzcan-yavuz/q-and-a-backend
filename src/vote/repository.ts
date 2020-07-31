import { v4 as uuidv4 } from 'uuid';
import { generateSetExpressions } from '../util';
import docClient from '../util/document-client';
import { Vote } from './Vote';

const TableName = process.env.VOTES_TABLE as string;

export const voteQuestion = async ({
  meetingId,
  questionId,
  userId,
  type,
}: Vote): Promise<Vote> => {
  const voteDocument = {
    userId,
    meetingId,
    questionId,
    type,
  };
  const params = {
    TableName,
    Item: voteDocument,
  };

  await docClient.put(params).promise();

  return voteDocument;
};

export const getUserVotes = async ({
  meetingId,
  userId,
}: Pick<Vote, 'meetingId' | 'userId'>): Promise<Vote> => {
  const params = {
    TableName,
    IndexName: 'meetingId-userId-index',
    KeyConditionExpression: 'meetingId = :meetingId AND userId = :userId',
    ExpressionAttributeValues: {
      ':meetingId': meetingId,
      ':userId': userId,
    },
  };

  const { Items: votes = [] } = await docClient.query(params).promise();

  return votes;
};
