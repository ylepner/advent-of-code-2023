type Direction = 'L' | 'R' | 'U' | 'D';

const movesTo: { [p in Direction]: [number, number] } = {
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
  U: [0, -1],
};

export function solve18(input: string, parseType: 1 | 2) {
  let data: [Direction, number][];
  if (parseType === 1) {
    data = parse(input);
  } else {
    data = parsePart2(input);
  }
  const vertexes = getPoints(data);
  const area = getArea(vertexes);
  const perimeter = getPerimeter(data);
  const result = area + perimeter / 2 + 1;
  return result;
}

function parse(str: string): [Direction, number][] {
  const result: [Direction, number][] = str.trim().split('\n').map(el => {
    const split = el.split(' ');
    const direction = split[0] as Direction;
    const steps: number = Number(split[1]);
    return [direction, steps];
  })

  return result;
}

function getPoints(instructions: [Direction, number][]) {
  let result: [number, number][] = [];
  result.push([0, 0]);
  for (let instruction of instructions) {
    const lastPoint = result.at(-1);
    const dir = instruction[0];
    const dirCoord: [number, number] = movesTo[dir];
    if (dirCoord[0] === undefined) {
      throw new Error('Oops!')
    }
    result.push([lastPoint![0] + instruction[1] * dirCoord[0], lastPoint![1] + instruction[1] * dirCoord[1]]);
  }
  const last = result[result.length - 1];
  console.log(result[0], result[result.length - 1]);
  return result;
}

function getArea(points: [number, number][]): number {
  let area = 0;
  let left = 0;
  let right = 0;

  for (let i = 0; i < points.length - 1; i++) {
    left += points[i][0] * points[i + 1][1]
  }

  for (let i = 0; i < points.length - 1; i++) {
    right += points[i][1] * points[i + 1][0]
  }

  area = Math.abs((right - left) / 2);
  return area;
}

function getPerimeter(data: [Direction, number][]) {
  const perimeter = data.map(el => Number(el[1])).reduce((a, b) => a + b);
  return perimeter;
}

function parsePart2(str: string) {
  const result: [Direction, number][] = str.trim().split('\n').map(el => {
    const split = el.trim().split(' ');
    const substr = split[2].substring(2, split[2].length - 2);
    const distance = getDecimalNumber(substr);
    if (String(substr).length < 5) {
      throw new Error('Incorrect parse!')
    }
    const dirIndex = Number(split[2].at(-2))!;
    const direction = Object.keys(movesTo)[dirIndex] as Direction;
    if (direction == null || distance == null) {
      throw new Error('Undefined!')
    }
    return [direction, distance];
  })
  return result;
}

function getDecimalNumber(str: string): number {
  return parseInt(str, 16);
}
