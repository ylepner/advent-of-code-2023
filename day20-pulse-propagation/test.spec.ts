import { convertData } from "./solution";

const test1 = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`

const test2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`

describe('Day 20, https://adventofcode.com/2023/day/20', () => {
  test('Should convert data to Connections Test 1', () => {
    const result = convertData(test1);
    expect(result).toBeDefined();
  })
  test('Should convert data to Connections Test 2', () => {
    const result = convertData(test2);
    expect(result).toBeDefined();
  })
})

// const result = {
//   'broadcast': ['a', 'b', 'c'],
//   '%a': 'b',
//   '%b': 'c',
//   '%c': 'inv',
//   '&inv': 'a',
// }

// button => low => broadcast
// broadcast => low => a,b,c
// a, off => a, on => high => b
// b, off => b, on => high => c
// c, off => c, on => high => inv 


