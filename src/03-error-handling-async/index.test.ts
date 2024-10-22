import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Hello, World!';
    const result = await resolveValue(value);

    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const expectedErrorMessage = 'Expected error message';

    try {
      throwError(expectedErrorMessage);
    } catch (error) {
      expect((error as { message: string }).message).toMatch(
        expectedErrorMessage,
      );
    }
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage = 'Oops!';

    try {
      throwError();
    } catch (error) {
      expect((error as { message: string }).message).toMatch(
        defaultErrorMessage,
      );
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
