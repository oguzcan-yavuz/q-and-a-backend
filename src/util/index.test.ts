import { generateSetExpressions } from '.';

describe('generateSetExpressions()', () => {
  it('should generate expression correctly', () => {
    const body = {
      a: 10,
      b: 20,
      c: {
        d: 30,
        e: 40,
      },
    };
    const expectedExpressions = {
      UpdateExpression: 'SET #a = :a, #b = :b, #c = :c',
      ExpressionAttributeNames: {
        '#a': 'a',
        '#b': 'b',
        '#c': 'c',
      },
      ExpressionAttributeValues: {
        ':a': 10,
        ':b': 20,
        ':c': {
          d: 30,
          e: 40,
        },
      },
    };

    const expressions = generateSetExpressions(body);

    expect(expressions).toEqual(expectedExpressions);
  });
});
