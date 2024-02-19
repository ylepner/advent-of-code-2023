import { convertData } from "./solution";

const test1 = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`

describe('Day 20, https://adventofcode.com/2023/day/20', () => {
  test('Should convert data to Connections', () => {
    const result = convertData(test1);
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


