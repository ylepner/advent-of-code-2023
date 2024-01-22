import { solve } from "../day12-hot-springs/solution";

describe('testing test', () => {
  test('should return element boolean', async () => {
    inputs2.forEach(async el => {
      if (typeof el[0] === 'string' && typeof el[1] === 'boolean') {
        const result = solve(el[0]);
        expect(result).toBe(el[1]);
      }
    })
  });
});

const inputs = [
  ["#.#.### 1,1,3", true],
  [".#...#....###. 1,1,3", true],
  [".#.###.#.###### 1,3,1,6", true],
  ["####.#...#... 4,1,1", true],
  ["#....######..#####. 1,6,5", true],
  [".###.##....# 3,2,1", true],
  [".#.### 1,1,3", false],
]

const inputs2 = [
  ['#.#.### 1,1,3', true],
  ['.#...#....### 1,1,3', true],
  ['.#.###.#.###### 1,3,1,6', true],
  ['####.#...#... 4,1,1', true],
  ['#....######..#####. 1,6,5', true],
  ['.###.##...# 3,2,1', true]
]
