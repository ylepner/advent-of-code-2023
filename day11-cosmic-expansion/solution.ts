import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  const dataArr = data.split('\n').map(el => el.trim().split(''));
  expand(dataArr);
}

solve();

function expand(grid: string[][]) {
  let newGrid: string[][] = [];
  // horizontal
  for (let i = 0; i < grid.length; i++) {
    newGrid.push(grid[i]);
    const row = grid[i];
    if (grid[i].every(el => el === '.')) {
      newGrid.push(grid[i]);
    }
  }
  //vertical
  let newGridVert = [];
  for (let k = 0; k < newGrid[0].length; k++) {
    if (checkColumnIfEmpty(k, newGrid)) {
      for (let times = 0; times < 2; times++) {
        for (let row = 0; row < newGrid.length; row++) {
          if (newGridVert.length === 0) {
            newGridVert[row] = ['.'];
          } else {
            newGridVert[row].push('.')
          }
        }
      }
    } else {
      for (let row = 0; row < newGrid.length; row++) {
        if (newGridVert.length < newGrid.length) {
          const symbol = newGrid[row][k];
          newGridVert[row] = [symbol];
        } else {
          const symbol = newGrid[row][k];
          newGridVert[row].push(symbol);
        }
      }
    }
  }
  const points = getCoordinates(newGridVert);
  const result = comparePairs(points);
  console.log(result);
}

function checkColumnIfEmpty(column: number, grid: string[][]) {
  let allEmpty = false;
  let i = 0;
  while (!allEmpty) {
    if (grid[i][column] === '.') {
      if (i === grid.length - 1) {
        allEmpty = true;
        break;
      }
      i++;
    } else {
      return allEmpty;
    }
  }
  return allEmpty;
}

function getCoordinates(grid: string[][]) {
  let points = [];
  for (let i = 0; i < grid.length; i++) {
    for (let k = 0; k < grid[0].length; k++) {
      if (grid[i][k] === '#') {
        points.push([i, k]);
      }
    }
  }
  return points;
}

function comparePairs(arr: number[][]) {
  let allSteps = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const steps = arr[j][0] - arr[i][0] + Math.abs(arr[j][1] - arr[i][1]);
      allSteps += steps;
    }
  }
  return allSteps;
}
