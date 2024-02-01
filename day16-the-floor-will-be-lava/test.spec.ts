import { solve16 } from "./solution"

const layout = `
.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`

const test1 = `
...
.-.
...
`

const test2 = `
.-.
...
...
`

const test1Result = `
###
...
...
`
const test3 = `
.-.
...
...
`

const test3Result = `
.|.
...
...
`

describe('Test correct direction', () => {
  test('Test 1', () => {
    const result = solve16(test1);
    expect(result).toBe(3);
  })
  test('Test 2', () => {
    const result = solve16(test2);
    expect(result).toBe(3);
  });
  test('Mark correctly visited cells', () => {
    const result = solve16(test1);
    expect(result).toBe(3);
  })
}) 