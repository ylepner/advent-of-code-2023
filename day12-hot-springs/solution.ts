import { readFile } from "fs/promises";
import path from "path";

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
  if (state.type === 'broken' && state.brokenCount === state.buckets[state.bucketIndex]) {
    state.bucketIndex += 1;
    if (state.bucketIndex > state.buckets.length) {
      return null;
    }
  }
  return {
    type: 'normal',
    bucketIndex: state.bucketIndex,
    buckets: state.buckets
  }
}

function checkIfPassed(springs: string, state: State) {
  for (let i = 0; i < springs.length; i++) {
    if (springs[i] === '#') {
      const newState = handleBrokenSpring(state);
      if (newState !== null) {
        state = newState;
      } else {
        return false
      }
    }
    else if (springs[i] === '.') {
      const newState = handleNormalSpring(state);
      if (newState) {
        state = newState;
      } else {
        return false
      }
    }
  }
  return true
}