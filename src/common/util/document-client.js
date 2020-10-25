import * as AWS from 'aws-sdk';

const options = process.env.IS_OFFLINE
  ? {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'root',
      secretAccessKey: 'root',
    }
  : {};

export default new AWS.DynamoDB.DocumentClient(options);
