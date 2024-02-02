import { readFile } from "fs/promises"
import path from "path"
import { solve16 } from "./soluiton2"

const layout = `
.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`

const test1 = `
...
.-.
...
`

const test2 = `
.-.
...
...
`

const test3 = `
.|.
...
...
`

const test4 = `
.\\.
...
./.
`

const test5 = `
.|.
.-|
...
`

async function getData(fileName: string) {
  const file = path.join(__dirname, fileName);
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}

describe('Test grid', () => {
  test('Test 1', () => {
    const data = strToArr(test1);
    const result = solve16(data, [0, 0], 'RIGHT');
    expect(result).toBe(3);
  })
  test('Test 2', () => {
    const data = strToArr(test2);
    const result = solve16(data, [0, 0], 'RIGHT');
    expect(result).toBe(3);
  })
  test('Test 3', () => {
    const data = strToArr(test3);
    const result = solve16(data, [0, 0], 'RIGHT');
    expect(result).toBe(4);
  })
  test('Test 4', () => {
    const data = strToArr(test4);
    const result = solve16(data, [0, 0], 'RIGHT');
    expect(result).toBe(5);
  })
  test('Test 5', () => {
    const data = strToArr(test5);
    const result = solve16(data, [0, 0], 'RIGHT');
    expect(result).toBe(7);
  })
  test('Test 6', async () => {
    const data = await getData('./data.txt');
    const result = solve16(strToArr(data), [0, 0], 'RIGHT');
    expect(result).toBe(46);
  })
  test('Big data', async () => {
    const data = await getData('./big-data.txt');
    const result = solve16(strToArr(data), [0, 0], 'RIGHT');
    expect(result).toBe(7392);
  })
});

function strToArr(string: string) {
  return string.trim().split('\n').map(el => el.trim().split(''))
}

