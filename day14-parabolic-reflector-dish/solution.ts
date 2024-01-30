export function solve14(data: string) {
  const split = data.trim().split('\n').map(el => el.trim());
  const revertedArr = revertGrid(split);
  const result = revertedArr.map(el => transformSingleString(el.join('')));
  const total = countTotal(result);
  return total;
}

export function transformSingleString(str: string) {
  let result = '';
  let roundedCount = 0;
  let cubeCount = 0;
  let pointCounter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '#') {
      cubeCount = 0;
      if (str[i] === 'O') {
        roundedCount += 1;
        continue;
      } else {
        pointCounter += 1;
      }
    } else {
      if (roundedCount === 0 && pointCounter === 0) {
        result += '#'.repeat(1)
      } else {
        result += 'O'.repeat(roundedCount);
        result += '.'.repeat(pointCounter);
        result += '#'.repeat(1);
        roundedCount = 0;
        pointCounter = 0;
      }
    }
  }
  if (result.length < str.length) {
    result += 'O'.repeat(roundedCount);
    result += '.'.repeat(pointCounter);
  }
  return result;
}

function revertGrid(grid: string[]): string[][] {
  let array = [];
  let subarray: string[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const el = grid[j][i];
      subarray.push(grid[j][i])
    }
    array.push(subarray);
    subarray = [];
  }
  return array;
}

function countTotal(array: string[]) {
  const revertedArr = revertGrid(array);
  const results = revertedArr.map((el, i) => {
    const amount = Array.from(el).filter(symbol => symbol === 'O')
    return amount.length * (array.length - i)
  })
  return results.reduce((a, b) => a + b);
}
