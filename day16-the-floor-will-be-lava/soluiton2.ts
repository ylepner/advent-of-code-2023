
type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type DirectionDefinition = {
  [p in Direction]: Direction | Direction[];
}
type Pipes = '-' | '|' | '/' | '\\';

const pipes: { [p in Pipes]: DirectionDefinition } = {
  "-": {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    TOP: ['LEFT', 'RIGHT'],
    BOTTOM: ['LEFT', 'RIGHT'],
  },
  '|': {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: ['TOP', 'BOTTOM'],
    RIGHT: ['TOP', 'BOTTOM'],
  },
  '/': {
    RIGHT: 'TOP',
    LEFT: 'BOTTOM',
    TOP: 'RIGHT',
    BOTTOM: 'LEFT',
  },
  '\\': {
    BOTTOM: 'RIGHT',
    LEFT: 'TOP',
    RIGHT: 'BOTTOM',
    TOP: 'LEFT',
  }
}

const movesTo: { [p in Direction]: [number, number] } = {
  BOTTOM: [1, 0],
  LEFT: [0, -1],
  TOP: [-1, 0],
  RIGHT: [0, 1]
};

interface Position {
  coordinates: [number, number];
  directionFrom: Direction;
}

function getNextDirection(grid: string[][], currentPosition: Position): Direction | Direction[] {
  const [x, y] = currentPosition.coordinates;
  const element = grid[x][y];
  if (element === '.' || element === '#') {
    return currentPosition.directionFrom;
  } else {
    return pipes[element as Pipes][currentPosition.directionFrom] as Direction | Direction[];
  }
}

function calcNextCoordinates(currentCoordinates: [number, number], direction: Direction): [number, number] {
  const [x, y] = currentCoordinates;
  const [dirX, dirY] = movesTo[direction];
  const [newX, newY] = [x + dirX, y + dirY];
  return [newX, newY];
}

function checkIfValid(grid: string[][], point: number[]) {
  const [x, y] = point;
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

export function solve16(grid: string[][], currentCoordinates: [number, number] = [0, 0], direction: Direction = 'RIGHT') {
  let resultGrid = Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }).fill('.')) as string[][];
  solve(grid, resultGrid, currentCoordinates, direction);
  const result = resultGrid.map(el => el.filter(el => el === '#').length).reduce((a, b) => a + b);
  return result;
}

function solve(grid: string[][], resultGrid: string[][], currentCoordinates: [number, number], direction: Direction) {
  let position: Position = {
    coordinates: currentCoordinates,
    directionFrom: direction
  }
  while (true) {
    if (checkIfValid(grid, position.coordinates)) {
      const [x, y] = position.coordinates;
      resultGrid[x][y] = '#';
      const newDirection = getNextDirection(grid, position);
      if (!Array.isArray(newDirection)) {
        const newCoordinates = calcNextCoordinates(position.coordinates, newDirection);
        position = {
          coordinates: newCoordinates,
          directionFrom: newDirection,
        }
      } else {

        let newDir1 = newDirection[0];
        const newCoordinates1 = calcNextCoordinates(position.coordinates, newDir1);
        solve(grid, resultGrid, newCoordinates1, newDir1);
        let newDir2 = newDirection[1];
        const newCoordinates2 = calcNextCoordinates(position.coordinates, newDir2);
        solve(grid, resultGrid, newCoordinates2, newDir2);
        break;
      }
    } else {
      break;
    }
  }
}
