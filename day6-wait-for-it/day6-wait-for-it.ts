import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = parseData(await readFile(file, { encoding: 'utf-8' }));
  const result = calculateDistance(data[0], data[1]);
  console.log(result);
}

solve();

function parseData(data: string) {
  const result = data.split('\n').map(el => {
    const split = el.split(':')
    const values = split[1].split(' ').map(Number).filter(x => !!x);
    return values
  })
  return result;
}

function calculateDistance(times: number[], distances: number[]) {
  const results: number[][] = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let options: number[] = [];
    for (let hold = 0; hold <= time; hold++) {
      const speed = hold;
      const remainingTime = time - hold;
      const traveled = remainingTime * speed;
      if (traveled > distance) {
        options.push(traveled)
      }
    }
    results.push(options);
  }

  return results.map(arr => arr.length).reduce((a, b) => a * b);
}