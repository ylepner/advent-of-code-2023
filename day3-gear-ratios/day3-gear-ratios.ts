type NumberLocation = {
  number: string;
  index: number;
};
type Vector = [number, number]
export function findNumbersInARow(input: string): Array<NumberLocation> {
  const matches = Array.from(input.matchAll(/\d+/g))
  return matches.map((el: RegExpMatchArray) => {
    const index = el.index!;
    const str = el[0];
    return {
      number: str,
      index: index
    }
  })
}

export function findPointsAround(location: NumberLocation, rowNumber: number, rowCount: number, colCount: number): Array<Vector> {
  const result: Array<Vector> = []
  for (let i = -1; i < location.number.length + 1; i++) {
    result.push([rowNumber - 1, location.index + i])
    result.push([rowNumber + 1, location.index + i])
  }
  result.push([rowNumber, location.index - 1]);
  result.push([rowNumber, location.index + location.number.length]);

  return result.filter(([row, col]) => {
    return row < rowCount && col < colCount && row >= 0 && col >= 0
  });
}

export function checkIfPartNumber(schema: Array<string>, rowNumber: number, location: NumberLocation): boolean {
  const points = findPointsAround(location, rowNumber, schema.length, schema[0].length);
  return points.some(([row, col]) => {
    return schema[row][col] !== '.'
  })
}

export function solve(data: string[]): number {
  const sum = data.map((str, i) => ({
    locations: findNumbersInARow(str),
    row: i
  })).flatMap((el) => {
    return el.locations.filter((location) => checkIfPartNumber(data, el.row, location))
  }).reduce((acc, current) => {
    acc = Number(current.number) + acc
    return acc;
  }, 0)
  return sum;
}
