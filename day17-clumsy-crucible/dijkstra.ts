export function solve17(input: string) {
  const matrix = parse(input);
  const result = dijkstra(matrix);
  return result;
}

function parse(str: string) {
  return str.trim().split('\n').map(el => el.trim().split('').map(el => Number(el)));
}

function dijkstra(grid: number[][]) {
  const rows = grid.length;
  const cols = grid[0].length;

  // create grid of distances
  const distances: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  distances[0][0] = grid[0][0];

  // create queue
  const queue = new PriorityQueue();

  // add to queue the first element
  queue.enqueue([0, 0], grid[0][0]);

  // get directions
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // loop
  while (!queue.isEmpty()) {
    const [x, y] = queue.dequeue()!;
    const distance = distances[x][y];

    for (let i = 0; i < 4; i++) {
      const newX = dx[i] + x;
      const newY = dy[i] + y;

      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        const newDistance = distance + grid[newX][newY];
        if (newDistance < distances[newX][newY]) {
          distances[newX][newY] = newDistance;
          queue.enqueue([newX, newY], newDistance);
        }
      }
    }
  }
  return distances[rows - 1][cols - 1];
}

class PriorityQueue {
  private elements: { element: [number, number], priority: number }[];

  constructor() {
    this.elements = [];
  }

  enqueue(element: [number, number], priority: number): void {
    this.elements.push({ element, priority });
    this.sort();
  }

  dequeue(): [number, number] | undefined {
    return this.elements.shift()?.element;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  private sort(): void {
    this.elements.sort((a, b) => a.priority - b.priority);
  }
}
