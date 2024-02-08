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

  const firstElement: ElementInfo = {
    position: [0, 0],
    priority: grid[0][0],
    direction: 'START',
    penalty: 1,
  }

  // add to queue the first element
  queue.enqueue(firstElement);

  // loop
  while (!queue.isEmpty()) {
    const element: ElementInfo = queue.dequeue()!;
    console.log(element);
    const [x, y] = element.position;
    const distance = element.priority;
    let steps = element.penalty;

    const directions = getDirections(element, grid);

    for (let dir of directions) {
      if (dir === element.direction && element.penalty === 3) {
        steps = 0;
        continue;
      } else {
        if (dir === element.direction) {
          steps += 1;
        }
        const [dirX, dirY] = movesTo[dir as Direction];
        const newX = x + dirX;
        const newY = y + dirY;
        if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
          const newDistance = distance + grid[newX][newY];
          if (newDistance < distances[newX][newY]) {
            distances[newX][newY] = newDistance;
            const element: ElementInfo = {
              position: [newX, newY],
              priority: newDistance,
              direction: dir,
              penalty: steps,
            }
            queue.enqueue(element);
          }
        }
      }
    }
  }
  return distances[rows - 1][cols - 1];
}

class PriorityQueue {
  private elements: ElementInfo[];

  constructor() {
    this.elements = [];
  }

  enqueue(element: ElementInfo): void {
    this.elements.push(element);
    this.sort();
  }

  dequeue(): ElementInfo | undefined {
    return this.elements.shift();
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  private sort(): void {
    this.elements.sort((a, b) => a.priority - b.priority);
  }
}

type ElementInfo = {
  position: [number, number];
  priority: number;
  direction: Direction | 'START';
  penalty: number;
}

const movesTo: { [p in Direction]: [number, number] } = {
  BOTTOM: [1, 0],
  LEFT: [0, -1],
  TOP: [-1, 0],
  RIGHT: [0, 1],
  START: [0, 0],
};

const oppositeMap: { [p in Direction]: Direction } = {
  TOP: 'BOTTOM',
  BOTTOM: 'TOP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
  START: 'START'
}

type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'START';

function getDirections(element: ElementInfo, grid: number[][]) {
  const directions: Direction[] = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
  const result: Direction[] = [];
  for (let dir of directions) {
    const [x, y] = element.position;
    const [dirX, dirY] = movesTo[dir];
    const newX = x + dirX;
    const newY = y + dirY;
    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      result.push(dir);
    }
  }
  return result.filter(el => el !== oppositeMap[element.direction]);
}
