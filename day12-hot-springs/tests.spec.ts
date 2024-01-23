import { countSolution, solve, unfold } from "../day12-hot-springs/solution";

const inputs = [
  ["#.#.### 1,1,3", true],
  [".#...#....###. 1,1,3", true],
  [".#.###.#.###### 1,3,1,6", true],
  ["####.#...#... 4,1,1", true],
  ["#....######..#####. 1,6,5", true],
  [".###.##....# 3,2,1", true],
  [".#.### 1,1,3", false],
  ["#.##. 1,3", false],
  [".## 3", false],
  [".# 2", false],
  [".# 1,1", false],
  [".#. 1,1", false],
  [".# 1,1", false],
] as const;

function runTest(index: number) {
  const result = solve(inputs[index][0])
  expect(result).toBe(inputs[index][1])
}

describe('testing test', () => {
  test('It should handle case 0', () => {
    runTest(0)
  });
  test('It should handle case 1', () => {
    runTest(1)
  });
  test('It should handle case 2', () => {
    runTest(2)
  });
  test('It should handle case 3', () => {
    runTest(3)
  });
  test('It should handle case 4', () => {
    runTest(4)
  });
  test('It should handle case 5', () => {
    runTest(5)
  });
  test('It should handle case 6', () => {
    runTest(6)
  });
  test('It should handle case 7', () => {
    runTest(7)
  });
  test('It should handle case 8', () => {
    runTest(8)
  });
  test('It should handle case 9', () => {
    runTest(9)
  });
  test('It should handle case 10', () => {
    runTest(10)
  });
  test('It should handle case 11', () => {
    runTest(11)
  });
  test('It should handle case 12', () => {
    runTest(12)
  });
});

function runCount(testNumber: number) {
  const [input, expected] = inputs2[testNumber];
  const result = countSolution(input)
  expect(result).toBe(expected)
}

describe('count test', () => {
  test('it should handle case 0', () => {
    runCount(0);
  })
  test('it should handle case 1', () => {
    runCount(1);
  })
  test('it should handle case 2', () => {
    runCount(2);
  })
  test('it should handle case 3', () => {
    runCount(3);
  })
  test('it should handle case 4', () => {
    runCount(4);
  })
  test('it should handle case 5', () => {
    runCount(5);
  })
})

describe('unfold', () => {
  test('it should be unfold correctly', () => {
    const result = unfold(inputs2[0][0]);
    expect(result).toBe('???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3')
  })
  test('it should be count correctly to unfold springs', () => {
    const result = countSolution(unfold(inputs2[1][0]));
    expect(result).toBe(16384);
  })
})


const inputs2 = [
  ["???.### 1,1,3", 1],
  [".??..??...?##. 1,1,3", 4],
  ["?#?#?#?#?#?#?#? 1,3,1,6", 1],
  ["????.#...#... 4,1,1", 1],
  ["????.######..#####. 1,6,5", 4],
  ["?###???????? 3,2,1", 10],
] as const;
