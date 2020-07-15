import { Meeting } from './Meeting';
import docClient from '../util/document-client';
const TableName = process.env.MEETINGS_TABLE as string;

const getMeeting = async (id: string): Promise<Meeting> => {
  const params = {
    TableName,
    Key: { id },
  };
  const { Item: meeting } = await docClient.get(params).promise();

  return meeting as Meeting;
};

export default {
  getMeeting,
};
