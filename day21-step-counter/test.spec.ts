import { solve21 } from "./solution";


const test1 = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`
describe('Day 21, https://adventofcode.com/2023/day/21', () => {
  test('Should get result test 1', () => {
    const result = solve21(test1);
    expect(result).toBe(16);
  })
})

