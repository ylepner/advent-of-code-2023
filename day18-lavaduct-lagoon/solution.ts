type Direction = 'L' | 'R' | 'U' | 'D';

const movesTo: { [p in Direction]: [number, number] } = {
  R: [1, 0],
  U: [0, -1],
  L: [-1, 0],
  D: [0, 1]
};

export function solve18(input: string) {
  const data: [Direction, number][] = parse(input);
  const vertexes = getPoints(data);
  const area = getArea(vertexes);
  const perimeter = getPerimeter(data);
  const result = area + perimeter / 2 + 1;
  return result;
}

function parse(str: string): [Direction, number][] {
  const result: [Direction, number][] = str.trim().split('\n').map(el => el.split(' ')[0] + el.split(' ')[1]).map(el => {
    const direction = el[0] as Direction;
    const steps: number = Number(el[1]);
    return [direction, steps];
  });

  return result;
}

function getPoints(instructions: [Direction, number][]) {
  let result: [number, number][] = [];
  result.push([0, 0]);
  for (let instruction of instructions) {
    const lastPoint = result.at(-1);
    const dir = instruction[0];
    const dirCoord: [number, number] = movesTo[dir];
    result.push([lastPoint![0] + instruction[1] * dirCoord[0], lastPoint![1] + instruction[1] * dirCoord[1]]);
  }
  const last = result[result.length - 1];
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
