export function solve17(input: string) {
  const matrix = parse(input);

  let isFirst = true;

  function getNeighbors(el: ElementInfo): ElementInfo[] {

    const allDirections: Direction[] = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];

    const result = allDirections.map(direction => {
      const [dRow, dCol] = movesTo[direction];
      const result: ElementInfo = {
        direction: direction,
        penalty: direction === el.direction ? el.penalty + 1 : 0,
        position: [el.position[0] + dRow, el.position[1] + dCol]
      }
      return result;
    }).filter((item) => {
      const opposite = oppositeMap[el.direction];
      if (item.direction === opposite) {
        if (!isFirst) {
          return false;
        } else {
          return true;
        }
      }
      if (item.position[0] < 0 || item.position[0] >= matrix.length || item.position[1] < 0 || item.position[1] >= matrix[0].length) {
        return false;
      }
      if (item.penalty > 2) {
        return false;
      }
      return true;
    })

    isFirst = false;
    return result;
  }

  function getCost(el: ElementInfo) {
    return matrix[el.position[0]][el.position[1]]
  }

  function toString(el: ElementInfo) {
    return `${el.position[0]}_${el.position[1]}_${el.direction}_${el.penalty}`;
  }

  function isEnd(el: ElementInfo) {
    return el.position[0] === matrix.length - 1 && el.position[1] === matrix[0].length - 1;
  }

  const element: ElementInfo = {
    position: [0, 0],
    direction: 'LEFT',
    penalty: 0
  }

  const result = dijkstra(element, getNeighbors, getCost, toString, isEnd);
  return result;
}

function parse(str: string) {
  return str.trim().split('\n').map(el => el.trim().split('').map(el => Number(el)));
}

function dijkstra<T>(start: T, getNeighbors: (el: T) => T[], getCost: (el: T) => number, toString: (el: T) => string, isEnd: (el: T) => boolean) {

  const q = new Map<string, { el: T, totalCost: number }>();
  const visit = new Set<string>();
  q.set(toString(start), { el: start, totalCost: 0 });

  function getMinElement() {
    var sorted = Array.from(q.entries()).sort((a, b) => a[1].totalCost - b[1].totalCost);
    return sorted[0]
  }

  while (q.size > 0) {
    const [key, node] = getMinElement();
    q.delete(key);
    visit.add(key);
    if (isEnd(node.el)) {
      return node.totalCost;
    }
    const neighbors = getNeighbors(node.el);
    for (let neighbor of neighbors) {
      if (visit.has(toString(neighbor))) {
        continue;
      }
      const cost = getCost(neighbor);
      const costToTheNeighbor = cost + node.totalCost;
      const prev = q.get(toString(neighbor));
      if (prev) {
        if (costToTheNeighbor < prev.totalCost) {
          prev.totalCost = costToTheNeighbor;
        }
      } else {
        q.set(toString(neighbor), {
          el: neighbor, totalCost: costToTheNeighbor
        })
      }
    }
  }
  throw new Error('Bad input :(')
}

type ElementInfo = {
  position: [number, number];
  direction: Direction;
  penalty: number;
}

const movesTo: { [p in Direction]: [number, number] } = {
  BOTTOM: [1, 0],
  LEFT: [0, -1],
  TOP: [-1, 0],
  RIGHT: [0, 1]
};

const oppositeMap: { [p in Direction]: Direction } = {
  TOP: 'BOTTOM',
  BOTTOM: 'TOP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
}

type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';
