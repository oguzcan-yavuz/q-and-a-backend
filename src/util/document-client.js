import * as AWS from 'aws-sdk';

const options = process.env.IS_OFFLINE
  ? {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'root', // needed if you don't have aws credentials at all in env
      secretAccessKey: 'root', // needed if you don't have aws credentials at all in env
    }
  : {};

export default new AWS.DynamoDB.DocumentClient(options);
