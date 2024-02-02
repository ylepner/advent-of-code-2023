
type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type DirectionDefinition = {
  [p in Direction]: Direction | 'split';
}
type Pipes = '-' | '|' | '/' | '\\';

const pipes: { [p in Pipes]: DirectionDefinition } = {
  "-": {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    TOP: 'split',
    BOTTOM: 'split',
  },
  '|': {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: 'split',
    RIGHT: 'split'
  },
  '/': {
    RIGHT: 'TOP',
    LEFT: 'BOTTOM',
    TOP: 'RIGHT',
    BOTTOM: 'LEFT'
  },
  '\\': {
    BOTTOM: 'RIGHT',
    LEFT: 'TOP',
    RIGHT: 'BOTTOM',
    TOP: 'LEFT'
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

function getNextDirection(grid: string[][], currentPosition: Position) {
  const [x, y] = currentPosition.coordinates;
  const element = grid[x][y];
  if (element === '.' || element === '#') {
    return currentPosition.directionFrom;
  } else {
    const newDir = pipes[element as Pipes][currentPosition.directionFrom] as Direction | 'split';
    if (newDir === 'split') {
      return getSplitDirections(currentPosition.directionFrom)
    } else {
      return newDir
    }
  }
}

function getSplitDirections(directionFrom: Direction) {
  let newDir1;
  let newDir2;
  if (directionFrom === 'LEFT' || directionFrom === 'RIGHT') {
    newDir1 = 'TOP';
    newDir2 = 'BOTTOM';
  } else {
    newDir1 = 'LEFT';
    newDir2 = 'RIGHT';
  }
  return [newDir1, newDir2];
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

export function solve16(grid: string[][], currentCoordinates: [number, number], direction: Direction) {
  let resultGrid = Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }).fill('.')) as string[][];
  let position: Position = {
    coordinates: currentCoordinates,
    directionFrom: direction
  }
  while (true) {
    if (checkIfValid(grid, position.coordinates)) {
      const [x, y] = position.coordinates;
      const newDirection = getNextDirection(grid, position) as Direction;
      const newCoordinates = calcNextCoordinates(position.coordinates, newDirection);
      resultGrid[x][y] = '#';
      if (!Array.isArray(newDirection)) {
        position = {
          coordinates: newCoordinates,
          directionFrom: newDirection,
        }
      }
    } else {
      break;
    }
  }
  const result = resultGrid.map(el => el.filter(el => el === '#').length).reduce((a, b) => a + b);
  return result;
}
