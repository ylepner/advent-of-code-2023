import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  const dataArr = parseData(data);
  const start = getStartPosition(dataArr);
  console.log(start);
  if (start) {
    console.log(move(dataArr, start));
  }
}

solve();

function parseData(data: string) {
  const result = data.split('\n').map(el => el.trim().split(''));
  return result;
}

type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type Pipe = [Direction, Direction];

// move FROM
const movesFrom: { [p in Direction]: [number, number] } = {
  BOTTOM: [-1, 0],
  LEFT: [0, 1],
  TOP: [1, 0],
  RIGHT: [0, -1]
};

// move TO
const movesTo: { [p in Direction]: [number, number] } = {
  BOTTOM: [1, 0],
  LEFT: [0, -1],
  TOP: [-1, 0],
  RIGHT: [0, 1]
};

const pipeDescriptions: Record<string, Pipe> = {
  '|': ['TOP', 'BOTTOM'],
  '-': ['LEFT', 'RIGHT'],
  'L': ['TOP', 'RIGHT'],
  'J': ['TOP', 'LEFT'],
  '7': ['BOTTOM', 'LEFT'],
  'F': ['BOTTOM', 'RIGHT']
}

function getStartPosition(grid: string[][]) {
  let start: number[] | null = null;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'S') {
        start = [i, j];
        return start;
      }
    }
  }
  return start;
}

function move(grid: string[][], startPosition: number[]) {
  let pointsArr = [];
  const startPositionCopy = [...startPosition];
  let [startX, startY] = startPositionCopy;
  let firstElement = getFirstDirection(startPosition, grid)!;
  [startX, startY] = firstElement.startPosition;
  let getLoop = false;
  while (!getLoop) {
    pointsArr.push(firstElement.startPosition);
    if (firstElement.symbol === 'S') {
      getLoop = true;
      break
    }
    const newPosition = getNewPosition(firstElement.startPosition, firstElement.directionTo, grid) as PointInfo;
    firstElement = newPosition;
  }
  return pointsArr.length / 2;
}

function checkIfValidPoint(x: number, y: number, grid: string[][]) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}
function getFirstDirection(startPoint: number[], grid: string[][]): PointInfo | undefined {
  for (let [direction, move] of Object.entries(movesFrom)) {
    let [row, col] = move;
    let newX = startPoint[0] + row;
    let newY = startPoint[1] + col;
    if (checkIfValidPoint(newX, newY, grid)) {
      const symbol = grid[newX][newY];
      if (pipeDescriptions[symbol]) {
        if (pipeDescriptions[symbol].includes(direction as Direction)) {
          const directionFrom = direction as Direction;
          const directionTo = pipeDescriptions[symbol].find(el => el !== direction) as Direction;
          return { directionFrom: directionFrom, symbol: symbol, directionTo: directionTo, startPosition: [newX, newY] };
        }
      } else {
        continue;
      }
    }
  }
}

function getNewPosition(startPoint: number[], directionTo: Direction, grid: string[][]) {
  let [row, col] = movesTo[directionTo];
  let newX = startPoint[0] + row;
  let newY = startPoint[1] + col;
  if (checkIfValidPoint(newX, newY, grid)) {
    const symbol = grid[newX][newY];
    if (symbol === 'S') {
      console.log('start');
      return {
        directionFrom: directionTo,
        directionTo: directionTo,
        symbol: symbol,
        startPosition: [newX, newY]
      }
    }
    const newDirectionFrom = reverseDirection(directionTo) as Direction;
    const newDirectionTo = pipeDescriptions[symbol].find(el => el !== newDirectionFrom)!
    if (newDirectionFrom) {
      return {
        directionFrom: newDirectionFrom,
        directionTo: newDirectionTo,
        symbol: symbol,
        startPosition: [newX, newY]
      }
    }
  }
}

interface PointInfo {
  startPosition: number[],
  symbol: string,
  directionFrom: Direction,
  directionTo: Direction,
}

function reverseDirection(direction: Direction) {
  const y = ['TOP', 'BOTTOM'];
  const x = ['LEFT', 'RIGHT'];
  if (y.includes(direction)) {
    return y.find(el => el !== direction);
  }
  if (x.includes(direction)) {
    return x.find(el => el !== direction);
  }
}
