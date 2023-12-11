import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const filePath = path.join(__dirname, './data.txt');
  const data = await readFile(filePath, { encoding: 'utf8' });
  console.log(parseData(data));
}

solve();

function parseData(data: string) {
  const lines = data.trim().split('\n').map(el => el.trim());
  const map: Map<string, number[][]> = new Map();
  let currentKey = '';
  for (let line of lines) {
    if (line.startsWith('seeds')) {
      const values = line.split(' ').map(Number).filter(x => !!x);
      map.set('seeds', [values]);
    }
    else if (line.endsWith('map:')) {
      currentKey = line.split(' ')[0];
      map.set(currentKey, []);
    }
    else {
      const values = line.split(' ').map(Number);
      if (values.length > 1) {
        map.get(currentKey)?.push(values);
      }
    }
  }
  return map;
}
