import { readFile } from "fs/promises";
import path from "path";

function parseInput(input: string) {
  const split = input.split(' ');
  let [springs, bucketsStr] = split;
  const buckets = bucketsStr.split(',').map(el => Number(el));
  return [springs, buckets] as const;
}

async function countOptions() {
  const data = await readData();
  const unfoldData = data.map(arr => unfold(arr.join(', ')));
  const result = unfoldData.map(arr => countSolution(arr)).reduce((a, b) => a + b);
  console.log(result);
}

countOptions();

export function solve(input: string) {
  let [springs, buckets] = parseInput(input);
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
type BrokenState = {
  type: 'broken',
  bucketIndex: number;
  brokenCount: number;
  buckets: number[];
};
type State = {
  type: 'normal',
  bucketIndex: number;
  buckets: number[];
} | BrokenState;


function handleBrokenSpring(state: State): State | null {
  let broken: number;
  if (state.bucketIndex > state.buckets.length) {
    return null;
  }
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

  if (state.type === 'normal') {
    return state;
  }

  if (state.type === 'broken') {
    if (state.brokenCount === state.buckets[state.bucketIndex]) {
      return {
        type: 'normal',
        buckets: state.buckets,
        bucketIndex: bucketIndex + 1,
      }
    }
  }
  return null;
}

function isAllBucketEmptied(brokenState: BrokenState) {
  if (brokenState.bucketIndex + 1 === brokenState.buckets.length && brokenState.brokenCount === brokenState.buckets[brokenState.bucketIndex]) {
    return true;
  }
  return false;
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
  if (state?.type === 'broken' && !isAllBucketEmptied(state)) {
    state = null;
  }
  if (state?.type === 'normal' && state.buckets[state.bucketIndex]) {
    state = null;
  }
  return state != null;
}

export function countSolution(input: string) {
  const [springs, buckets] = parseInput(input);
  return count(springs, {
    type: 'normal',
    buckets: buckets,
    bucketIndex: 0,
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
  if (state?.type === 'broken' && !isAllBucketEmptied(state)) {
    state = null;
  }
  if (state?.type === 'normal' && state.buckets[state.bucketIndex]) {
    state = null;
  }
  if (state == null) {
    return 0;
  }
  return 1;
}

export function unfold(str: string) {
  const split = str.split(' ');
  const copiesStr = Array(4).fill(split[0] + '?').join('') + split[0];
  const copiesNumbers = Array(4).fill(split[1] + ',').join('') + split[1];
  return copiesStr + ' ' + copiesNumbers;
}
