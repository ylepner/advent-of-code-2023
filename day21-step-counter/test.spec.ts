import { readFile } from "fs/promises";
import { solve21 } from "./solution";
import path from "path";


const test1 = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`
describe('Day 21, https://adventofcode.com/2023/day/21', () => {
  test('Should get result test 1', () => {
    const result = solve21(test1, 6);
    expect(result).toBe(16);
  })
  test('Test big data', async () => {
    const data = await getData();
    const result = solve21(data, 64);
    expect(result).toBe(3591);
  })
})

async function getData() {
  const file = path.join(__dirname, 'data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}
