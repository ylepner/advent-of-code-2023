import { checkIfPartNumber, findNumbersInARow, findPointsAround, solve } from "./day3-gear-ratios";
import path from "path";
import { readFile } from "fs/promises";


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

const schema = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`
function getSchema() {
  return schema.split('\n').map(x => x.trim()).filter(x => !!x);
}
describe('isPartNumber', () => {
  test('should return false', () => {
    const schema = getSchema();
    const result = checkIfPartNumber(schema, 5, findNumbersInARow(schema[5])[0])
    expect(result).toBe(false)
  })

  test('should return false because no symbols', () => {
    const result = checkIfPartNumber(getSchema(), 0, {
      index: 5,
      number: '114'
    })
    expect(result).toBe(false)
  })

  test('should return true because has symbols', () => {
    const result = checkIfPartNumber(getSchema(), 0, {
      index: 0,
      number: '467'
    })
    expect(result).toBe(true)
  })

})

describe('solution', () => {
  test('should return sum 4361 for test data', () => {
    const result = solve(getSchema());
    expect(result).toBe(4361);
  })

  test('should work', async () => {
    const file = path.join(__dirname, './data.txt');
    const data = (await readFile(file, { encoding: 'utf8' })).split('\n').map((str) => str.trim()).filter(x => !!x);
    const result = solve(data);
    console.log(result);
  })
})


