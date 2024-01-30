import { readFile } from "fs/promises"
import path from "path"
import { solve14, transformSingleString } from "./solution"

const test1 = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`

const test2 = `
OO.O.O..##
`

const test3 = `
.#O..#O...`

const test4 = `
OO..#....#
`

describe('Single string test', () => {
  test('tint', () => {
    const result = transformSingleString(test2.trim());
    expect(result).toBe('OOOO....##');
  })
  test('tint', () => {
    const result = transformSingleString(test3.trim());
    expect(result).toBe('.#O..#O...');
  })
  test('tint', () => {
    const result = transformSingleString(test4.trim());
    expect(result).toBe('OO..#....#');
  })
})

describe('Test an array of strings', () => {
  test('Should revert and tint', () => {
    const result = solve14(test1.trim());
    expect(result).toBe(136);
  })
})

describe('Find result on big data', () => {
  test('Should receive result', async () => {
    const data = await getData();
    const result = solve14(data);
    console.log(result);
  })
})

async function getData() {
  const file = path.join(__dirname, './data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}