type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

const directions: { [p in Direction]: [number, number] } = {
  BOTTOM: [-1, 0],
  LEFT: [0, 1],
  TOP: [1, 0],
  RIGHT: [0, -1]
};

export function solve21(input: string, steps: number) {
  const grid = parse(input);
  const start: [number, number] = getStartCoordinates(grid);
  const result = [];
  let visited: [number, number][] = [start];
  let queue: [number, number, number][] = [[start[0], start[1], steps]];
  let row = 0;
  let col = 0;

  while (queue.length) {
    const [x, y, stepsLeft] = queue.shift()!;
    if (stepsLeft % 2 === 0) {
      result.push([x, y]);
    }
    if (stepsLeft === 0) {
      continue
    }
    for (let direction of Object.entries(directions)) {
      const newRow = x - direction[1][0];
      const newCol = y - direction[1][1];
      if (!visited.some(el => el[0] === newRow && el[1] === newCol)) {
        if (checkIfValidPoint(newRow, newCol, grid)) {
          row = newRow;
          col = newCol;
          visited.push([row, col]);
          queue.push([row, col, stepsLeft - 1]);
        }
      } else {
        continue;
      }
    }
  }
  return result.length;

  function parse(data: string) {
    const result = data.trim().split('\n').map(line => line.trim().split(''));
    return result;
  }

  function getStartCoordinates(grid: string[][]) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 'S') {
          return [i, j] as [number, number];
        }
      }
    }
    throw new Error('Starting position not found');
  }

  function checkIfValidPoint(x: number, y: number, grid: string[][]) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] !== '#';
  }
}
