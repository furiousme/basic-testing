// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 10, b: 20, action: Action.Add };
    const output = simpleCalculator(input);
    expect(output).toBe(30);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Subtract };
    const output = simpleCalculator(input);
    expect(output).toBe(5);
  });

  test('should multiply two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Multiply };
    const output = simpleCalculator(input);
    expect(output).toBe(6);
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 2, action: Action.Divide };
    const output = simpleCalculator(input);
    expect(output).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const output = simpleCalculator(input);
    expect(output).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 10, b: 20, action: 'invalid action' };
    const output = simpleCalculator(input);
    expect(output).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '10', b: '20', action: Action.Divide };
    const output = simpleCalculator(input);
    expect(output).toBeNull();
  });
});
