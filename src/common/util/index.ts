import { APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

export const createProxyResult = (statusCode: number, body: object): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
});

type UpdateExpressions = {
  UpdateExpression: DynamoDB.UpdateExpression;
  ExpressionAttributeNames: DynamoDB.ExpressionAttributeNameMap;
  ExpressionAttributeValues: DynamoDB.ExpressionAttributeValueMap;
};

export const generateSetExpressions = (body: object): UpdateExpressions => {
  // TODO: doesn't work for partial nested updates, it replaces the object completely
  const expressions = Object.entries(body).reduce(
    (acc, [key, value]) => {
      acc.UpdateExpression.push(`#${key} = :${key}`);
      acc.ExpressionAttributeNames[`#${key}`] = key;
      acc.ExpressionAttributeValues[`:${key}`] = value;

      return acc;
    },
    {
      UpdateExpression: [] as string[],
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    }
  );
  const updateExpression = `SET ${expressions.UpdateExpression.join(', ')}`;

  return { ...expressions, UpdateExpression: updateExpression };
};

export const calculateVoteAddition = (oldValue: number = 0, newValue: number = 0): number => {
  return -oldValue + newValue;
};
