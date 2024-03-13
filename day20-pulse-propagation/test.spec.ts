import { convertData } from "./solution2";
import { solveTest } from "./solution";
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
  test('Should convert data to Connections Test 1', () => {
    const result = convertData(test1);
    expect(result).toBeDefined();
  })
  test('Should convert data to Connections Test 2', () => {
    const result = convertData(test2);
    expect(result).toBeDefined();
  })
  test('Test 1', () => {
    const result = solveTest(test1);
    expect(result).toBe(32000000);
  })
  test('Test big data', async () => {
    const data = await getData();
    const result = solveTest(data);
    expect(result).toBeLessThan(910664370);
  })
})


async function getData() {
  const file = path.join(__dirname, 'data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}
