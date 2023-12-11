import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const filePath = path.join(__dirname, './data.txt');
  const data = await readFile(filePath, { encoding: 'utf8' });
  const mapData = parseData(data);
  const seeds = Object.values(mapData.seeds).flat();
  const locations: number[] = [];
  for (let seed of seeds) {
    let source: number = seed;
    for (const [key, value] of (mapData.maps as Map<string, number[][]>).entries()) {
      const result = convert(source, key, mapData.maps);
      if (result) {
        source = result;
      }
    }
    locations.push(source);
  }
  console.log(Math.min(...locations));
}

solve();

function parseData(data: string): SeedsData {
  const lines = data.trim().split('\n').map(el => el.trim());
  let seeds: Record<'seeds', number[]> = { seeds: [] };
  const maps: Map<string, number[][]> = new Map();
  let currentKey = '';
  for (let line of lines) {
    if (line.startsWith('seeds')) {
      const values = line.split(' ').map(Number).filter(x => !!x);
      seeds['seeds'] = values;
    }
    else if (line.endsWith('map:')) {
      currentKey = line.split(' ')[0];
      maps.set(currentKey, []);
    }
    else {
      const values = line.split(' ').map(Number);
      if (values.length > 1) {
        maps.get(currentKey)?.push(values);
      }
    }
  }
  return { seeds, maps };
}

function convert(seed: number, key: string, mapData: Map<string, number[][]>) {
  const soilValues = mapData.get(key);
  if (soilValues) {
    for (let values of soilValues) {
      if (values[1] <= seed && (values[1] + values[2]) >= seed) {
        const diff = seed - values[1];
        return values[0] + diff
      }
    }
  }
  return null;
}

interface SeedsData {
  seeds: Record<'seeds', number[]>,
  maps: Map<string, number[][]>
}