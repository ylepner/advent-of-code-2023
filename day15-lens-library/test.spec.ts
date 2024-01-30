import { readFile } from "fs/promises";
import path from "path";
import { solve15 } from "./solution";

const test1 = 'rn=1';
const test2 = 'cm-';

const stringsTest = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'

describe('Test sequences', () => {
  test('test1', () => {
    const result = solve15(test1);
    expect(result).toBe(30);
  });
  test('test2', () => {
    const result = solve15(test2);
    expect(result).toBe(253);
  });
  test('test3', () => {
    const result = solve15(stringsTest);
    expect(result).toBe(1320);
  });
})

describe('Sum of big data', () => {
  test('Should receive sum', async () => {
    const data = await getData();
    const result = solve15(data);
    console.log(result);
  });
})

async function getData() {
  const file = path.join(__dirname, './data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}