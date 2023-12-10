import { readFile } from "fs/promises";
import path from "path";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf8' });
  const dataArr = data.split('\n').map((str) => str.trim()).filter((x) => !!x);
  const parts = dataArr.map((str) => str.split('|').map(el => el.trim()));
  const cards = parts.map((part) => [part[0].split(':')[1].trim(), part[1].trim()]);
  let result: number = 0;
  for (let card of cards) {
    const winningNumbers = card[0].split(' ').filter(x => !!x);
    const numbersList = card[1].split(' ').filter(x => !!x);
    const cardMatches: string[] = [];
    let cardResult: number = 0;
    for (let number of winningNumbers) {
      if (numbersList.includes(number)) {
        if (cardMatches.length < 1) {
          cardResult += 1;
        } else {
          cardResult *= 2;
        }
        cardMatches.push(number);
      }
    }
    result += cardResult;
  }
  console.log(result);
}
solve();