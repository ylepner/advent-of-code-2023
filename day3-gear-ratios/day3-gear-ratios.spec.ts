import { findNumbersInARow } from "./day3-gear-ratios";


describe('testing index file', () => {
  test('empty string should result in zero', () => {
    const result = findNumbersInARow(".345..*.5");
    expect(result).toStrictEqual([{
      number: '345',
      index: 1
    }, {
      number: '5',
      index: 8
    }])
  });
});
