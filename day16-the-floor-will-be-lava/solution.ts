// right, down, left, up
const splittersDescriptions: Record<string, Pipe> = {
  '|': ['TOP', 'BOTTOM'],
  '-': ['LEFT', 'RIGHT'],
}

const mirrorsDescriptions: Record<string, Pipe> = {
  '/': ['LEFT', 'TOP'] || ['BOTTOM', 'RIGHT'],
  '\\': ['LEFT', 'BOTTOM'] || ['RIGHT', 'TOP']
}

type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type Pipe = [Direction, Direction];

type Position = [number, number];

const movesTo: { [p in Direction]: [number, number] } = {
  BOTTOM: [1, 0],
  LEFT: [0, -1],
  TOP: [-1, 0],
  RIGHT: [0, 1]
};

export function solve16(field: string, startPosition: Position = [0, 0], directionTo: Direction = 'RIGHT') {
  const grid = field.trim().split('\n').map(el => el.trim());
  let isValid = true;
  let resultGrid = Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }).fill('.'));
  while (isValid) {
    const [x, y] = startPosition;
    resultGrid[x][y] = '#';
    const newPosition = getStep(grid, startPosition, directionTo);
    if (newPosition != null) {
      startPosition = newPosition.point;
      directionTo = newPosition.direction;
      continue
    } else {
      isValid = false;
    };
  }
  const result = resultGrid.map(el => el.filter(el => el === '#').length).reduce((a, b) => a + b);
  return result;
}

function getStep(grid: string[], startPosition: Position, directionTo: Direction) {
  let [x, y] = startPosition;
  const directionCoordinates = movesTo[directionTo];
  let [xDir, yDir] = directionCoordinates;
  const nextStep: Position = [x + xDir, y + yDir];
  let newDir: Direction | null = directionTo;
  if (checkIfValid(grid, nextStep)) {
    const element = grid[nextStep[0]][nextStep[1]];
    if (element === '.') {
      newDir = directionTo;
    }
    else if (Object.keys(mirrorsDescriptions).includes(element)) {
      const directionFrom = reverseDirection(directionTo);
      newDir = mirrorsDescriptions[element].find(el => el !== directionFrom)!;
    } else {
      if (Object.values(splittersDescriptions[element]).includes(directionTo)) {
        newDir = directionTo;
      } else {
        let newDirFirst = splittersDescriptions[element][0];
        let newDirSecond = splittersDescriptions[element][1];
      }
    }
  } else {
    return null;
  }
  return { point: nextStep, direction: newDir || directionTo };
}

function checkIfValid(grid: string[], point: number[]) {
  const [x, y] = point;
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
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