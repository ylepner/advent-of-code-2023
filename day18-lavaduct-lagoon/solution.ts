export function solve18(input: string) {
  const data = parse(input);
  const vertexes = getPoints(data);
  const area = getArea(vertexes);
  const perimeter = getPerimeter(vertexes);
  const result = area + perimeter / 2 + 1;
  return result;
}

function parse(str: string) {
  return str.trim().split('\n').map(el => el.split(' ')[0] + el.split(' ')[1])
}

function getPoints(instructions: string[]) {
  let startX = 0;
  let startY = 0;
  let result: [number, number][] = [];
  result.push([startX, startY]);
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
    result.push([startX, startY]);
  }
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

  area = Math.abs((left - right) / 2);
  return area;
}

function getPerimeter(points: [number, number][]) {
  let perimeter = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i][0] - points[i + 1][0];
    const dy = points[i][1] - points[i + 1][1];
    perimeter += Math.sqrt(dx * dx + dy * dy);
  }
  return perimeter;
}
