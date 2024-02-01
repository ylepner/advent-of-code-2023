import { readFile } from "fs/promises"
import path from "path"
import { solve16 } from "./solution"

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
.|...,....
|.-.,.....
.....|-...
........|.
..........
.........,
....;.,,..
.-.-;..|..
.|....-|.,
..;;.|....
`

describe('Test correct direction', () => {
  test('Test 1', () => {
    const result = solve16(test1);
    expect(result).toBe(3);
  })
  test('Test 2', () => {
    const result = solve16(test2);
    expect(result).toBe(3);
  });
  test('Test 3', () => {
    const result = solve16(test3);
    expect(result).toBe(4);
  })
  test('Test 4', async () => {
    const data = await getData();
    const result = solve16(data);
    expect(result).toBe(46);
  })
})

async function getData() {
  const file = path.join(__dirname, './data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}