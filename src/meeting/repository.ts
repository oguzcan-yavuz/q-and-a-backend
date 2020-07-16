import { Meeting } from './Meeting';
import docClient from '../util/document-client';
import { v4 as uuidv4 } from 'uuid';
const TableName = process.env.MEETINGS_TABLE as string;

const getMeeting = async (id: string): Promise<Meeting> => {
  const params = {
    TableName,
    Key: { id },
  };
  const { Item: meeting } = await docClient.get(params).promise();

  return meeting as Meeting;
};

const createMeeting = async (meeting: Omit<Meeting, 'id'>): Promise<Pick<Meeting, 'id'>> => {
  const id = uuidv4();
  const params = {
    TableName,
    Item: { id, ...meeting },
  };

  await docClient.put(params).promise();

  return { id };
};

export default {
  getMeeting,
  createMeeting,
};
