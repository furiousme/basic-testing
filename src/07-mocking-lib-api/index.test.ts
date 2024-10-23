import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((a) => a),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: {} });
    const createSpy = jest
      .spyOn(axios, 'create')
      .mockImplementationOnce(
        () => ({ get: mockGet } as unknown as AxiosInstance),
      );

    await throttledGetDataFromApi('/api');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: {} });
    jest
      .spyOn(axios, 'create')
      .mockImplementationOnce(
        () => ({ get: mockGet } as unknown as AxiosInstance),
      );

    await throttledGetDataFromApi('/api');
    expect(mockGet).toHaveBeenCalledWith('/api');
  });

  test('should return response data', async () => {
    const responseData = "'response data";
    const mockGet = jest.fn().mockResolvedValueOnce({ data: responseData });
    jest
      .spyOn(axios, 'create')
      .mockImplementationOnce(
        () => ({ get: mockGet } as unknown as AxiosInstance),
      );

    const response = await throttledGetDataFromApi('/api');
    expect(response).toBe(responseData);
  });
});
