import { Meeting, MeetingBody, MeetingStatus } from './Meeting';
import docClient from '../util/document-client';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../error/not-found-exception';
import { generateSetExpressions } from '../util';
import { Service } from 'typedi';
const TableName = `${process.env.MEETINGS_TABLE}-${process.env.NODE_ENV}`;

@Service()
export class MeetingRepository {
  async getMeeting(meetingId: Meeting['id']): Promise<Meeting | undefined> {
    const params = {
      TableName,
      Key: { id: meetingId },
    };
    const { Item: meeting } = await docClient.get(params).promise();

    return meeting as Meeting;
  }

  async createMeeting(meeting: MeetingBody): Promise<Pick<Meeting, 'id'>> {
    const meetingId = uuidv4();
    const meetingDocument = {
      id: meetingId,
      status: MeetingStatus.Open,
      ...meeting,
    } as Meeting;
    const params = {
      TableName,
      Item: meetingDocument,
    };

    await docClient.put(params).promise();

    return { id: meetingId };
  }

  async deleteMeeting(meetingId: Meeting['id']): Promise<void> {
    try {
      const params = {
        TableName,
        Key: { id: meetingId },
        ConditionExpression: 'attribute_exists(id) AND #status <> :status',
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': MeetingStatus.Deleted,
        },
      };

      await docClient.update(params).promise();
    } catch (error) {
      throw error.code === 'ConditionalCheckFailedException' ? new NotFoundException() : error;
    }
  }

  async updateMeeting(meetingId: Meeting['id'], meeting: Partial<MeetingBody>): Promise<void> {
    try {
      const {
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
      } = generateSetExpressions(meeting);
      const params = {
        TableName,
        Key: { id: meetingId },
        ConditionExpression: 'attribute_exists(id) AND #status <> :status',
        UpdateExpression,
        ExpressionAttributeNames: {
          ...ExpressionAttributeNames,
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ...ExpressionAttributeValues,
          ':status': MeetingStatus.Deleted,
        },
      };

      await docClient.update(params).promise();
    } catch (error) {
      throw error.code === 'ConditionalCheckFailedException' ? new NotFoundException() : error;
    }
  }
}
