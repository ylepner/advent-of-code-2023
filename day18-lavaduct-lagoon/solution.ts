export function solve18(input: string) {
  const data = parse(input);
  const gridSize = findGridSize(data);
  const grid: string[][] = Array.from({ length: gridSize[0] }, () => Array.from({ length: gridSize[1] }).fill('.') as string[]);
  const result = fillGrid(grid, data);
  return 0;
}

function parse(str: string) {
  return str.trim().split('\n').map(el => el.split(' ')[0] + el.split(' ')[1])
}

function findGridSize(data: string[]) {
  let rows: number[] = [];
  let cols: number[] = [];
  let right: number = 0;
  let down: number = 0;
  for (let el of data) {
    if (el[0] === 'R') {
      const add = right += Number(el[1]);
      cols.push(add);
    }
    if (el[0] === 'L') {
      const subtract = right -= Number(el[1]);
      cols.push(subtract);
    }
    if (el[0] === 'D') {
      const add = down += Number(el[1]);
      rows.push(add);
    }
    if (el[0] === 'U') {
      const subtract = down -= Number(el[1]);
      rows.push(subtract);
    }
  }
  return [Math.max(...rows) + 1, Math.max(...cols) + 1];
}

function fillGrid(grid: string[][], instructions: string[]) {
  let currCol = 0;
  let currRow = 0;
  let colEnd = 0;
  let rowEnd = 0;
  for (let instruction of instructions) {
    const steps = Number(instruction[1]);
    if (instruction[0] === 'R') {
      colEnd = currCol + steps;
    }
    if (instruction[0] === 'L') {
      colEnd = currCol - steps;
    }
    if (instruction[0] === 'D') {
      rowEnd = currRow + steps;
    }
    if (instruction[0] === 'R') {
      rowEnd = currRow - steps;
    }
    if (colEnd > 0) {
      for (let i = currCol; i < currCol + colEnd; i++) {
        grid[currRow][i] = '#'
      }
      currCol = colEnd;
    }
    if (rowEnd > 0) {
      for (let i = currRow; i < currRow + rowEnd; i++) {
        grid[i][currCol] = '#'
      }
      currRow = rowEnd;
    }
  }
  return grid;
} 