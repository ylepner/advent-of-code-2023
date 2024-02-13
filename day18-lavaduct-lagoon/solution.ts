export function solve18(input: string) {
  const data = parse(input);
  const gridSize = findGridSize(data);
  const grid: string[][] = Array.from({ length: gridSize[0] }, () => Array.from({ length: gridSize[1] }).fill('.') as string[]);
  const result = getPoints(grid, data);
  return result;
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

function getPoints(grid: string[][], instructions: string[]) {
  let startX = 0;
  let startY = 0;
  let result: [number, number][] = [];
  result.push([startX, startY]);
  // get new x, new y
  for (let instruction of instructions) {
    if (instruction[0] === 'R') {
      startX += Number(instruction[1]);
    };
    if (instruction[0] === 'L') {
      startX -= Number(instruction[1]);
    };
    if (instruction[0] === 'D') {
      startY += Number(instruction[1]);
    };
    if (instruction[0] === 'U') {
      startY -= Number(instruction[1]);
    }
    if (startX === grid[0].length || startX === 0) {
      startY += 1;
    }
    if (startY === grid.length || startY === 0) {
      startX += 1;
    }
    result.push([startX, startY]);
  }
  return result;
}

