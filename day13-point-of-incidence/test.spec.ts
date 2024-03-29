import { getData, getResult, solve13 } from "./solution";

const test1 = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`;

const test2 = `
#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

const test3 = `
.#.####.#.#
...####....
....##....#
.#.####.#.#
.#..##..#.#
##......#.#
.#..##..#.#
####..####.
.########..
.#..##..#.#
..######..#
##.####.###
##.####.###`

const test4 = `
.#..#.#.##..#
#.####..#####
..##.###.#..#
.#.####.#.##.
.#.####.#.##.
..##.###.#..#
#.####..#####
.##.#.#.##..#
#..#.###.####
#..#.###..##.
#..#..#.#....`

const test5 = `
#.#....##..####
.#..###........
###...###..#..#
###.#.###..#..#
.#..###........
#.#....##..####
##.#.....#.####
##.##.....##..#
..##..#....#..#`

const test6 = `
.#..####..####..#
.#..####..####..#
.#..####..#####.#
.#######..#######
#####.######.####
.....##....##....
#..###.####.###..
..##..........##.
..######..######.`

const test7 = `
.##.##.
#...##.
.######
#..#..#
#..#..#
.######
#...##.
.##.##.
.#..#..
.#.....
##.....
#.#####
#..####
##.#..#
#.#####
`

describe('Should get index before vertical line in the middle', () => {
  test('test1', async () => {
    const result = await solve13(test1.trim());
    expect(result).toBe(5);
  });
  test('test2', async () => {
    const result = await solve13(test2.trim());
    expect(result).toBe(400);
  });
  test('test3', async () => {
    const result = await solve13(test3.trim());
    expect(result).toBe(1200);
  });
  test('test4', async () => {
    const result = await solve13(test4.trim());
    expect(result).toBe(11);
  });
  test('test5', async () => {
    const result = await solve13(test5.trim());
    expect(result).toBe(13);
  });
  test('test6', async () => {
    const result = await solve13(test6.trim());
    expect(result).toBe(100);
  });
  test('test7', async () => {
    const result = await solve13(test7.trim());
    expect(result).toBe(400);
  });

});
describe('Should find sum of index', () => {
  test('test on array', async () => {
    const result = await getResult();
    expect(result).toBeLessThan(30824);
    console.log(result);
  });
})
