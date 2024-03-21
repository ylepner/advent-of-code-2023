import { readFile } from "fs/promises";
import { solve22 } from "./solution";
import path from "path";

const input = `
1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9
`

describe('Day 22, https://adventofcode.com/2023/day/22', () => {
  test('Should get result test 1', () => {
    const result = solve22(input);
    expect(result).toBe(5);
  })
  test('Big data', async () => {
    const data = await getData();
    const result = solve22(data);
    expect(result).toBe(413);
  })
})

async function getData() {
  const file = path.join(__dirname, 'data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}
