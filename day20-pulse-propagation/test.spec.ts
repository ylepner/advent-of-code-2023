import { solve } from "./solution";
import { readFile } from "fs/promises";
import path from "path";

const test1 = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`

const test2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`



describe('Day 20, https://adventofcode.com/2023/day/20', () => {
  test('Should get result test 1', () => {
    const result = solve(test1);
    expect(result).toBe(32000000);
  })
  test('Should get result test 2', () => {
    const result = solve(test2);
    expect(result).toBe(11687500);
  })
  test('Test big data', async () => {
    const data = await getData();
    const result = solve(data);
    expect(result).toBeLessThan(910664370);
  })
})

async function getData() {
  const file = path.join(__dirname, 'data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}
