import docClient from '../common/util/document-client';
import { Vote } from './Vote';
import { Service } from 'typedi';

const TableName = `${process.env.VOTES_TABLE}-${process.env.NODE_ENV}`;

@Service()
export class VoteRepository {
  async voteQuestion({ meetingId, questionId, userId, type }: Vote): Promise<Vote> {
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
  }

  async getVotesOfCurrentUser({
    meetingId,
    userId,
  }: Pick<Vote, 'meetingId' | 'userId'>): Promise<Vote[]> {
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

    return votes as Vote[];
  }
}
