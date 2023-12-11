import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf8' });
  const cards = parseData(data);
  const result = cards.map(card => getCardScore(card)).filter(x => !!x).reduce((a, b) => a + b);
  console.log(result);
}

solve();

function parseData(data: string) {
  const dataArr = data.split('\n').map((str) => str.trim()).filter((x) => !!x);
  const parts = dataArr.map((str) => str.split('|').map(el => el.trim()));
  return parts.map((part) => [part[0].split(':')[1].trim(), part[1].trim()]);
}

function getCardScore(card: string[]) {
  const winningNumbersSet = new Set(card[0].split(' ').map(Number).filter(x => !!x));
  const numbersListSet = new Set(card[1].split(' ').map(Number).filter(x => !!x));
  const result = Array.from(winningNumbersSet).reduce((acc, current) => numbersListSet.has(current) ? acc + 1 : acc, 0)
  if (result > 0) {
    return Math.pow(2, result - 1);
  }
  return 0;
}
