import { readFile } from "fs/promises";
import path from "path";
import { solve17 } from "./dijkstra";
import { solve } from "./solution";

const test1 = `
24
32`

const test2 = `
241
321
325
`

const test3 = `
2413
3215
3255
3446
`

const test4 = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`

describe('Test Dijkstra algorithm', () => {
  test('Test 1', () => {
    const result = solve17(test1.trim());
    expect(result).toBe(7);
  })
  test('Test 2', () => {
    const result = solve17(test2.trim());
    expect(result).toBe(13);
  })
  test('Test 3', () => {
    const result = solve17(test3.trim());
    expect(result).toBe(23);
  })
  test('Test 4', () => {
    const result = solve17(test4.trim());
    expect(result).toBe(80);
  })
})
