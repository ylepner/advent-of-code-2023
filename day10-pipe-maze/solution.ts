import { Dir } from "fs";
import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  const dataArr = parseData(data);
  console.log(dataArr);
}

solve();

function parseData(data: string) {
  const result = data.split('\n').map(el => el.trim().split(''));
  return result;
}

type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type Pipe = [Direction, Direction];

const moves: { [p in Direction]: [number, number] } = {
  TOP: [0, -1],
  BOTTOM: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0]
};

const pipeDescriptions: Record<string, Pipe> = {
  '|': ['TOP', 'BOTTOM'],
  '—': ['LEFT', 'RIGHT'],
  'L': ['TOP', 'RIGHT'],
  'J': ['TOP', 'LEFT'],
  '7': ['BOTTOM', 'LEFT'],
  'F': ['BOTTOM', 'RIGHT']
}
