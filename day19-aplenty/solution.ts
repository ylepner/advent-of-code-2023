type Option = 'more' | 'less' | 'whatever';

type Result = Redirect | Accepted | Rejected | Whatever;


interface Context {
  currentLineId: string;
  lines: Record<string, Condition[]>;
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
  type: 'condition' | 'whatever';
  what?: keyof Item;
  than?: number;
  op?: Option;
  result: Result;
}


export function solve19() {

}

export function parseWorkflows(input: string) {
  let lines: Record<string, Condition[]> = {};
  input.trim().split('\n').map(string => {
    const key = string.split('{')[0];
    const conditions = string.split('{')[1].split(',').map(el => el.split(':'));
    let conditionsArray: Condition[] = [];
    for (let condition of conditions) {
      const what = condition[0][0] as keyof Item;
      const than = Number(condition[0].slice(2));
      let result: Result;
      let op: Option;
      if (condition[0][1] === '<') {
        op = 'less';
      } else if (condition[0][1] === '>') {
        op = 'more';
      } else {
        op = 'whatever';
        result = { type: 'whatever', result: { type: 'redirect', lineId: condition[0].slice(0, -1) } } as Whatever;
        conditionsArray.push(result);
        break;
      };
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
  // {x=787,m=2655,a=1222,s=2876}
  const result = input.trim().split('\n').map(line => {
    return line.trim().slice(1, line.length - 1).split(',').map(el => el.trim().split('=')).map(el => {
      const key: string = el[0];
      return {
        [el[0]]: el[1],
      };
    });
  });
  return result;
}
