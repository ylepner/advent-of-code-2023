import { readFile } from "fs/promises";
import path from "path";
type NumberLocation = {
  number: string;
  index: number;
};
type Vector = [number, number]
export function findNumbersInARow(input: string): Array<NumberLocation> {
  const matches = Array.from(input.matchAll(/\d+/g))
  return matches.map((el: RegExpMatchArray) => {
    const index = el.index!;
    const str = el[0];
    return {
      number: str,
      index: index
    }
  })
}

export function findPointsAround(location: NumberLocation, rowNumber: number, rowCount: number, colCount: number): Array<Vector> {
  const result: Array<Vector> = []
  // up row
  for (let i = -1; i < location.number.length + 1; i++) {
    result.push([rowNumber - 1, location.index + i])
    result.push([rowNumber + 1, location.index + i])
  }
  result.push([rowNumber, location.index - 1]);
  result.push([rowNumber, location.index + 1]);

  return result.filter(([row, col]) => {
    return row < rowCount && col < colCount && row >= 0 && col >= 0
  });
}

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf8' });
  const grid = data.split('\n');
  let sum: number[] = [];
  const numbersInGrid = returnNumbersCoords(grid);
  for (let [number, [row, endCol]] of numbersInGrid) {
    const startPoint = endCol - String(number).length + 1;
    const checkAround = checkIfAroundNotSymbols(grid, row, startPoint, String(number).length);
    console.log(checkAround, number);
    if (!checkAround) {
      sum.push(number);
    }

  }
  console.log(numbersInGrid);
  console.log(sum.reduce((a, b) => a + b));
}

function returnNumbersCoords(grid: string[]) {
  let coords: Map<number, number[]> = new Map();
  for (let row = 0; row < grid.length; row++) {
    let numberInGrid: number[] = [];
    for (let col = 0; col < grid[row].length; col++) {
      const char = grid[row][col];
      if (Number(char)) {
        if (Number(grid[row][col + 1])) {
          numberInGrid.push(Number(char));
        } else {
          numberInGrid.push(Number(char));
          coords.set(Number(numberInGrid.join('')), [row, col]);
          numberInGrid = [];
        }
      }
    }
  }
  return coords;
}

function checkIfAroundNotSymbols(grid: string[], row: number, startCol: number, length: number) {
  const surroundings = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1] // down-right
  ];

  for (let i = 0; i < length; i++) {
    const col = startCol + i;
    for (let [dx, dy] of surroundings) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
        const char = grid[newRow][newCol];
        if (Number(char)) {
          continue;
        }
        if (char !== '.') {
          return false;
        }
      }
    }
  }
  return true;
}

// solve();