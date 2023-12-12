import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  parseData(data);
}

solve();

function parseData(data: string) {
  const result = data.split('\n').map(el => {
    const split = el.split(':')
    const values = split[1].split(' ').map(Number).filter(x => !!x);
    return values
  })
  console.log(result);
}