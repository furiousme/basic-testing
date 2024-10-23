import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  const timeout = 1000;
  let cb: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
    cb = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(cb, timeout);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const timeout = 1000;
  let cb: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
    cb = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, timeout);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(cb, timeout);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';
    const spy = jest.spyOn(path, 'join').mockImplementationOnce(jest.fn());
    await readFileAsynchronously(pathToFile);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
    spy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const nonExistentFile = 'nonExistentFile';
    const result = await readFileAsynchronously(nonExistentFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = './index.ts';
    const fileContent = 'file content';
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementationOnce(() => true);
    const readFileSpy = jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementationOnce(() => Promise.resolve(Buffer.from(fileContent)));

    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(fileContent);
    existsSyncSpy.mockRestore();
    readFileSpy.mockRestore();
  });
});
