import { count } from "console";
import { readFile } from "fs/promises";
import path from "path";

let steps: string[];
interface Node {
  id: string;
  left?: Node;
  right?: Node;
}

interface NodeData {
  node: string;
  elements: string[];
}

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = await readFile(file, { encoding: 'utf-8' });
  steps = data.trim().split('\n')[0].trim().split('');
  const instructions = data.split('\n').slice(2);
  const dataRes = splitData(instructions);
  const tree = createTree(dataRes);
  if (tree) {
    console.log(countSteps(tree, 'ZZZ', steps));
  }
}

solve();

function splitData(data: string[]) {
  const res = data.map(el => el.split('='));
  const instructions = res.map(el => {
    return { node: el[0].trim(), elements: el[1].trim().replace('(', '').replace(')', '').split(', ').map(el => el.trim()) }
  })
  return instructions;
}

function createTree(dataStructure: NodeData[]) {
  const nodeMap: Record<string, Node> = {};
  if (dataStructure.length < 0) {
    return null
  }
  dataStructure.forEach(el => {
    const newNode: Node = { id: el.node };
    nodeMap[el.node] = newNode;
  })

  dataStructure.forEach(el => {
    const currentNode = nodeMap[el.node];
    const [leftElement, rightElement] = el.elements;
    if (leftElement) {
      if (currentNode.left) {
        throw new Error(`Element already there! ${currentNode.id} ${currentNode.left}`)
      }
      currentNode.left = nodeMap[leftElement];
    } else {
      throw new Error('Wrong data left')
    }
    if (rightElement) {
      if (currentNode.right) {
        throw new Error(`Element already there! ${currentNode.id} ${currentNode.right}`)
      }
      currentNode.right = nodeMap[rightElement];
    } else {
      throw new Error('Wrong data left')
    }
  })
  return nodeMap['AAA']
}

function countSteps(root: Node, target: string, steps: string[]) {
  let currentNode = root;
  let totalSteps = 0;
  while (currentNode.id !== 'ZZZ') {
    let countNumber = totalSteps % steps.length;
    if (steps[countNumber] === 'L' && currentNode.left) {
      currentNode = currentNode.left;
    } else if (steps[countNumber] === 'R' && currentNode.right) {
      currentNode = currentNode.right;
    } else {
      throw new Error(`${currentNode}, ${totalSteps}`)
    }
    console.log(currentNode.id);
    totalSteps++;
  }
  return totalSteps;
}
