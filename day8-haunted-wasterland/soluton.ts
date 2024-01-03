import { readFile } from "fs/promises";
import path from "path";
import { isConstructSignatureDeclaration } from "typescript";

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  const steps = data.split('\n')[0].split('');
  const instructions = data.split('\n').slice(2);
  splitData(instructions);
}

solve();

function splitData(data: string[]) {
  const res = data.map(el => el.split('='));
  console.log(res);
}