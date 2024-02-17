import { EOL } from "os";

type Option = 'more' | 'less';

type Result = Redirect | Accepted | Rejected;


interface Context {
  currentLineId: string;
  lines: Record<string, Step[]>;
}

interface Item {
  x: number;
  m: number;
  a: number;
  s: number;
}

interface Redirect {
  type: 'redirect';
  lineId: string;
}

interface Accepted {
  type: 'accepted';
}

interface Rejected {
  type: 'rejected';
}

interface Whatever {
  type: 'whatever';
  result: Result;
}

interface Condition {
  type: 'condition';
  what: keyof Item;
  than: number;
  op: Option;
  result: Result;
}

type Step = Whatever | Condition;

export function solve19(data: string) {
  const splitted = data.split(/\n\s*\n/);
  const conditions = parseWorkflows(splitted[0]);
  const items = parseRatings(splitted[1]);
  return processAll(conditions, items);
}

export function processAll(conditions: Record<string, Step[]>, items: Item[]) {
  const result = items.filter(item => process(conditions, item));
  const reduce = result.reduce((acc, b) => acc + Number(b.x) + Number(b.m) + Number(b.a) + Number(b.s), 0);
  return reduce;
}

export function process(conditions: Record<string, Step[]>, item: Item): boolean {
  let lineId = 'in';
  const test = conditions[lineId];
  let currentConditionIndex = 0;
  while (true) {

    const line = conditions[lineId];
    if (!line) {
      throw new Error(`Impossible line ${lineId}`)
    }

    const condition = conditions[lineId][currentConditionIndex];
    const result = processStep(condition, item);
    if (!result) {
      currentConditionIndex += 1;
      continue;
    }
    if (result.type === 'accepted') {
      return true;
    } else if (result.type === 'rejected') {
      return false;
    } else if (result.type === 'redirect') {
      lineId = result.lineId;
      currentConditionIndex = 0;
    };
  }
}

export function processStep(step: Step, item: Item): Result | null {
  if (step.type === "whatever") {
    return step.result;
  }
  let number = step.than;
  if ((step.op === 'less' && item[step.what] < number) || (step.op === 'more' && item[step.what] > number)) {
    return step.result;
  } else {
    return null;
  }
}

export function parseWorkflows(input: string) {
  let lines: Record<string, Step[]> = {};
  input.trim().split('\n').map(string => {
    const key = string.split('{')[0];
    const conditions = string.trim().split('{')[1].trim().split(',');
    let conditionsArray: Step[] = [];
    for (let condition of conditions) {
      if (condition[condition.length - 1] === '}') {
        let resultOfWhatever: Result = getResult(condition.slice(0, -1));
        const whateverResult: Whatever = {
          type: "whatever",
          result: resultOfWhatever,
        }
        conditionsArray.push(whateverResult);
        break;
      }
      const split = condition.trim().split(':');
      const what = split[0][0] as keyof Item;
      const than = Number(split[0].slice(2));
      const nextStep = split[1];
      let op: Option;

      if (split[0][1] === '<') {
        op = 'less';
      } else if (split[0][1] === '>') {
        op = 'more';
      } else {
        throw new Error('Option error!')
      }

      let result: Result = getResult(nextStep);

      const conditionResult: Condition = {
        type: 'condition',
        what: what,
        than: than,
        op: op,
        result: result,
      }
      conditionsArray.push(conditionResult);
    }
    lines[key] = conditionsArray;
  })
  return lines;
}

function getResult(condition: string) {
  let result: Result;
  if (condition === 'A') {
    result = { type: 'accepted' };
  } else if (condition === 'R') {
    result = { type: 'rejected' };
  } else {
    result = { type: 'redirect', lineId: condition }
  };
  return result;
}


export function parseRatings(input: string) {
  const result = input.trim().split('\n').map(parseRating);
  return result;
}

export function parseRating(line: string): Item {
  line = line.trim();
  const entries = line.slice(1, line.length - 1).split(',').map(el => el.trim().split('=')).map(el => {
    return [el[0], el[1]] as const
  });
  return Object.fromEntries(entries) as any;
}
