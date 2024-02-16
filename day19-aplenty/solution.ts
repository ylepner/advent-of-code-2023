type Option = 'more' | 'less' | 'whatever';

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
  result: Redirect;
}

interface Condition {
  type: 'condition';
  what: keyof Item;
  than: number;
  op: Option;
  result: Result;
}

type Step = Whatever | Condition;



export function solve19() {

}

export function parseWorkflows(input: string) {
  let lines: Record<string, Step[]> = {};
  input.trim().split('\n').map(string => {
    const key = string.split('{')[0];
    const conditions = string.split('{')[1].split(',').map(el => el.split(':'));
    let conditionsArray: Step[] = [];
    for (let condition of conditions) {
      const what = condition[0][0] as keyof Item;
      const than = Number(condition[0].slice(2));
      let step: Step;
      let op: Option;
      if (condition[0][1] === '<') {
        op = 'less';
      } else if (condition[0][1] === '>') {
        op = 'more';
      } else {
        op = 'whatever';
        step = { type: 'whatever', result: { type: 'redirect', lineId: condition[0].slice(0, -1) } };
        conditionsArray.push(step);
        break;
      };
      let result: Result;
      if (condition[condition.length - 1] === 'A') {
        result = { type: 'accepted' };
      } else if (condition[condition.length - 1] === 'R') {
        result = { type: 'rejected' };
      } else {
        result = { type: 'redirect', lineId: condition[1] }
      }
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


export function parseRatings(input: string) {
  const result = input.trim().split('\n').map(parseRating);
  return result;
}

export function parseRating(line: string): Item {
  const entries = line.trim().slice(1, line.length - 1).split(',').map(el => el.trim().split('=')).map(el => {
    return [el[0], el[1]] as const
  });
  return Object.fromEntries(entries) as any;
}
