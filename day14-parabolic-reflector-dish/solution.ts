export function solve14(data: string) {
  console.log(data);
  const split = data.trim().split('\n').map(el => el.trim().split(''));
  const result = revertGrid(split);
  return result;
}

function revertGrid(grid: string[][]): string[][] {
  let array = [];
  let subarray: string[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      subarray.push(grid[j][i])
    }
    array.push(subarray);
    subarray = [];
  }
  return array;
}

function countTotal(array: string[]) {
  const results = array.map((el, i) => {
    const amount = Array.from(el).filter(symbol => symbol === 'O')
    return amount.length * (10 - i)
  })
  return results.reduce((a, b) => a + b);
}