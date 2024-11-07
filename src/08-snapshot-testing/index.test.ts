import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = ['first', 'second', 'third'];
    const linkedList = generateLinkedList(values);
    const expectedResult = {
      value: 'first',
      next: {
        value: 'second',
        next: { value: 'third', next: { value: null, next: null } },
      },
    };
    expect(linkedList).toStrictEqual(expectedResult);
  });

  test('should generate linked list from values 2', () => {
    const values = [1, 2, 3, 4, 5, 6];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
