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

describe('Test correct direction', () => {
  test('Test 1', () => {
    const result = solve16(test1);
    expect(result).toStrictEqual([0, 2]);
  })
})