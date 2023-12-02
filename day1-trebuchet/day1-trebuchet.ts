import fs from 'fs/promises';
import path from 'path';

async function solve() {
  const filePath = path.join(__dirname, './data.txt');
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  const lines = data.split('\n');
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i].match(/\d+/g)?.join('');
    if (numbers) {
      if (numbers.length > 2) {
        const firstChar = numbers[0];
        const lastChar = numbers[numbers.length - 1];
        const resNumber = firstChar + lastChar;
        result.push(resNumber);
      } else if (numbers.length === 1) {
        result.push(numbers + numbers);
      }
      else {
        result.push(numbers)
      }
    }
  }
  const sum = result.map(el => Number(el)).reduce((a, b) => a + b);
  console.log(sum);
};

solve();
