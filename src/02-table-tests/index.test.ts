import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
];

describe('simpleCalculator', () => {
  it.each(testCases)('simpleCalculator(%s)', ({ a, b, action, expected }) => {
    const output = simpleCalculator({ a, b, action });
    expect(output).toEqual(expected);
  });
});
