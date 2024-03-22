export function solve22(input: string) {

  function parse(data: string) {
    return data.trim().split('\n').map(line => line.replace('~', ',').split(',').map(el => Number(el)));
  }

  const bricks = parse(input);

  bricks.sort((a, b) => a[2] - b[2]);

  function ifOverlaps(a: number[], b: number[]): boolean {
    return Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4]);
  }

  for (let index = 0; index < bricks.length; index++) {
    let maxZ = 1;
    const brick = bricks[index];
    for (let i = 0; i < index; i++) {
      const check = bricks[i];
      if (ifOverlaps(bricks[index], check)) {
        maxZ = Math.max(maxZ, check[5] + 1);
      }
    }
    const zDiff = brick[2] - maxZ;
    brick[5] -= zDiff;
    brick[2] = maxZ;
  }

  bricks.sort((a, b) => a[2] - b[2]);

  const lowerSupportsUpper: { [key: number]: Set<number> } = {};
  const upperSupportLower: { [key: number]: Set<number> } = {};
  for (let i = 0; i < bricks.length; i++) {
    lowerSupportsUpper[i] = new Set();
    upperSupportLower[i] = new Set();
  }

  for (let j = 0; j < bricks.length; j++) {
    const upper = bricks[j];
    for (let i = 0; i < j; i++) {
      const lower = bricks[i];
      if (ifOverlaps(lower, upper) && upper[2] === lower[5] + 1) {
        lowerSupportsUpper[i].add(j);
        upperSupportLower[j].add(i);
      }
    }
  }

  let result = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (Array.from(lowerSupportsUpper[i]).every(j => upperSupportLower[j].size >= 2)) {
      result++;
    }
  }

  return result;
}
