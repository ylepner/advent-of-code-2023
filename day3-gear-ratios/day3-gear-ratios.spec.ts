import { findNumbersInARow, findPointsAround } from "./day3-gear-ratios";


describe('testing index file', () => {
  test('should return array of objects with numbers location', () => {
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

describe('findPointsAround', () => {
  test('should return array of points around number', () => {
    const result = findPointsAround({
      number: '34',
      index: 1
    }, 1, 10, 20)
    const expected = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]] as const;

    expect(result.length).toBe(expected.length)

    expected.forEach(([expectedRow, expectedCol]) => {
      const isFound = !!expected.find(([row, col]) => {
        return expectedRow === row && expectedCol === col
      })

      expect(isFound).toBe(true)
    })
  })
  test('should return array except of points out of boundaries', () => {
    const result = findPointsAround({
      number: '34',
      index: 1
    }, 0, 10, 20)
    const expected = [[0, 0], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]]
    expect(result.length).toBe(expected.length)

    expected.forEach(([expectedRow, expectedCol]) => {
      const isFound = !!expected.find(([row, col]) => {
        return expectedRow === row && expectedCol === col
      })

      expect(isFound).toBe(true)
    })
  })
})


