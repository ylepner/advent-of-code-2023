import { readFile } from "fs/promises";
import path from "path";
function parseInput(input: string) {
  const split = input.split(' ');
  let [springs, bucketsStr] = split;
  const buckets = bucketsStr.split(',').map(el => Number(el));
  return [springs, buckets] as const;
}

export function solve(info: string) {
  // const file = path.join(__dirname, './data.txt');
  // const result = await readFile(file, { encoding: 'utf-8' });
  // const data = info.split('\n').map(el => el.trim().split(' '));
  const split = info.split(' ');
  let [springs, bucketsStr] = split;
  const buckets = bucketsStr.split(',').map(el => Number(el));
  let state: State = {
    type: 'normal',
    bucketIndex: 0,
    buckets: buckets,
  };
  const check = checkIfPassed(springs, state);
  return check;
}

async function readData() {
  const file = path.join(__dirname, './data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result.split('\n').map(el => el.trim().split(' '));
}

type State = {
  type: 'normal',
  bucketIndex: number;
  buckets: number[];
} | {
  type: 'broken',
  bucketIndex: number;
  brokenCount: number;
  buckets: number[];
};


function handleBrokenSpring(state: State): State | null {
  let broken: number;
  if (state.type === 'broken') {
    broken = state.brokenCount + 1;
  } else {
    broken = 1
  }
  if (broken <= state.buckets[state.bucketIndex]) {
    return {
      type: 'broken',
      bucketIndex: state.bucketIndex,
      brokenCount: broken,
      buckets: state.buckets
    }
  } else {
    return null;
  }
}

function handleNormalSpring(state: State): State | null {
  let bucketIndex = state.bucketIndex;
  if (state.type === 'broken' && state.brokenCount === state.buckets[state.bucketIndex]) {
    bucketIndex += 1;
    if (state.bucketIndex > state.buckets.length) {
      return null;
    }
  }
  return {
    type: 'normal',
    bucketIndex: bucketIndex,
    buckets: state.buckets
  }
}

function checkIfPassed(springs: string, state: State | null) {
  for (let i = 0; i < springs.length; i++) {
    if (state == null) {
      return false;
    }
    if (springs[i] === '#') {
      state = handleBrokenSpring(state);
    }
    else if (springs[i] === '.') {
      state = handleNormalSpring(state);
    }
  }
  return state != null;
}

export function countSolution(input: string) {
  const [springs, buckets] = parseInput(input);
  return count(springs, {
    type: 'normal',
    buckets: buckets,
    bucketIndex: 0
  }, 0)
}

export function count(springs: string, state: State | null, startFrom: number): number {
  for (let i = startFrom; i < springs.length; i++) {
    if (state == null) {
      return 0;
    }
    if (springs[i] === '#') {
      state = handleBrokenSpring(state);
    }
    else if (springs[i] === '.') {
      state = handleNormalSpring(state);
    } else if (springs[i] === '?') {
      const left = count(springs, handleNormalSpring(state), i + 1);
      const right = count(springs, handleBrokenSpring(state), i + 1);
      return left + right;
    }
  }
  if (state == null) {
    return 0;
  }
  return 1;
  //return state != null;
}