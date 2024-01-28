import { readFile } from "fs/promises";
import path from "path";

export async function solve13(dataStr: string) {
  const split = dataStr.split('\n').map(el => el.trim());
  const result = getMiddle(split);
  return result;
}

export async function getResult() {
  const data = await getData();
  const results = data.map(el => getMiddle(el));
  return results.reduce((a, b) => a + b);
}


export async function getData() {
  const file = path.join(__dirname, './data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  let subarray: string[] = [];
  let array: string[][] = [];
  const split = result.split('\n').map(el => el.trim());
  console.log(split);
  for (let item of split) {
    if (item === '') {
      array.push(subarray);
      subarray = [];
    } else {
      subarray.push(item);
    }
  }
  if (subarray.length > 0) {
    array.push(subarray);
  }
  return array;
}

function getMiddle(arr: string[]) {
  const vertIndex = reflection({ grid: arr, maxRow: arr[0].length, maxCol: arr.length, getElement: (grid, rowOrCol, i) => grid[i][rowOrCol] });
  const horizIndex = reflection({ grid: arr, maxRow: arr.length, maxCol: arr[0].length, getElement: (grid, rowOrCol, i) => grid[rowOrCol][i] });
  if (horizIndex) {
    return horizIndex * 100
  }
  if (vertIndex) {
    return vertIndex
  }
  throw new Error('Error!');
}

type ReflectionParams = { grid: string[], maxRow: number, maxCol: number, getElement: (grid: string[], rowOrColNumber: number, elementNumber: number) => string }

function reflection({ grid, maxRow, maxCol, getElement }: ReflectionParams): null | number {
  let middleIndex: null | number = null;
  for (let i = 0; i < maxRow - 1; i++) {
    const rowOrCol1 = i;
    const rowOrCol2 = i + 1;
    const isEquals = linesEquals(rowOrCol1, rowOrCol2, { grid, maxRow, maxCol, getElement });
    if (isEquals) {
      middleIndex = i;
      const isReflections = checkIfReflection(middleIndex, { grid, maxRow, maxCol, getElement });
      if (isReflections) {
        return middleIndex + 1;
      }
    }
  }
  return null;
}

function checkIfReflection(middleIndex: number, params: ReflectionParams): boolean {
  for (let i = 0; ; i++) {
    const line1 = middleIndex - i;
    const line2 = middleIndex + 1 + i;
    if (line1 >= 0 && line2 <= params.maxRow - 1) {
      const isEquals = linesEquals(line1, line2, params);
      if (isEquals && (line1 === 0 || line2 === params.maxRow - 1)) {
        return true;
      } else {
        continue;
      }
    } else {
      return false;
    }
  }
}

function linesEquals(line1: number, line2: number, params: ReflectionParams): boolean {
  for (let j = 0; j < params.maxCol; j++) {
    const el1 = params.getElement(params.grid, line1, j);
    const el2 = params.getElement(params.grid, line2, j);

    if (!([el1, el2].every(el => ['.', '#'].includes(el)))) {
      throw new Error(`Wrong input! '${el1}' '${el2}'`)
    }
    if (el1 === el2) {
      if (j === params.maxRow - 1) {
        return true;
      } else {
        continue;
      }
    } else {
      return false;
    }
  }
  return true;
}
