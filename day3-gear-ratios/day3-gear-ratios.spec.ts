import { findNumbersInARow } from "./day3-gear-ratios";


describe('testing index file', () => {
  test('empty string should result in zero', () => {
    const result = findNumbersInARow(".345..*.5.72");
    expect(result).toBe([[1, 3], [8, 1], [10, 2]])
  });
});