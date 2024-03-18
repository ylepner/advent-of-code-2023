export function solve22(input: string) {
  const bricks = parse(input);
  const sortedBricksByZ = bricks.sort((a, b) => a[2] - b[2]);
  for (let i = 0; i < sortedBricksByZ.length - 1; i++) {
    let maxZ = 1;
    for (let j = 0; j < i; j++) {
      const brick = sortedBricksByZ[i];
      const check = sortedBricksByZ[j];
      const intersections = checkIfIntersections(brick, check);
      if (intersections) {
        maxZ = Math.max(maxZ, check[5] + 1);
      }
    }
    sortedBricksByZ[i][5] -= sortedBricksByZ[i][2] - maxZ;
    sortedBricksByZ[i][2] = maxZ;
  }
  sortedBricksByZ.sort((a, b) => a[2] - b[2]);
  return sortedBricksByZ;
}

function parse(data: string) {
  return data.trim().split('\n').map(line => line.replace('~', ',').split(',').map(el => Number(el)));
}

function checkIfIntersections(brick1: number[], brick2: number[]) {
  return Math.max(brick1[0], brick2[0]) <= Math.min(brick1[3], brick2[3]) && Math.max(brick1[1], brick2[1]) <= Math.min(brick1[4], brick2[4]);
}
