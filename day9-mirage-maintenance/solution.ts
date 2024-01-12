import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  const convertData = parseData(data);
  const result = convertData.map(el => extrapolate(el)).reduce((a, b) => a + b);
  console.log(result);

}

solve();

function parseData(data: string): number[][] {
  const splitData = data.trim().split('\n').map(el => el.trim().split(' ').map(el => Number(el.trim())));
  return splitData;
}

function findDiff(arr: number[]): number[] {
  let result: number[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    result.push(arr[i + 1] - arr[i])
  }
  return result;
}

function extrapolate(arr: number[]) {
  let oasis = [];
  let modifiedArr = [...arr];
  oasis.push(modifiedArr);
  while (!modifiedArr.every(el => el === 0)) {
    modifiedArr = findDiff(modifiedArr);
    oasis.push(modifiedArr);
  }
  let resultValue = 0;
  for (let i = oasis.length - 1; i > 0; i--) {
    const lastElementInArr = oasis[i][oasis[i].length - 1];
    const secondToLastEl = oasis[i - 1][oasis[i].length - 1];
    const newValue = secondToLastEl + lastElementInArr;
    resultValue += newValue;
  }
  return resultValue;
}