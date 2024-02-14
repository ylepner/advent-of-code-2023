import { readFile } from "fs/promises"
import path from "path"
import { solve18 } from "./solution"

const input1 = `
R 6 (#70c710)
D 2 (#0dc571)
L 6 (#5713f0)
U 2 (#d2c081)
`

const input2 = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3
`
describe('Get area', () => {
  test('Test1', () => {
    const result = solve18(input1);
    expect(result).toBe(21);
  })
  test('Test2', () => {
    const result = solve18(input2);
    expect(result).toBe(62);
  })
})

describe('Test big data', () => {
  test('Big data', async () => {
    const data = await getData();
    const result = solve18(data);
    expect(result).toBe(35401);
  })
})

async function getData() {
  const file = path.join(__dirname, 'data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}