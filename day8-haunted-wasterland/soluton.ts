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
  steps = data.split('\n')[0].split('');
  const instructions = data.split('\n').slice(2);
  const dataRes = splitData(instructions);
  const finishNode = dataRes[dataRes.length - 1].node.trim();
  const tree = createTree(dataRes);
  if (tree) {
    console.log(countSteps(tree, finishNode, steps));
  }
}

solve();

function splitData(data: string[]) {
  const res = data.map(el => el.split('='));
  const instructions = res.map(el => {
    return { node: el[0], elements: el[1].replace('(', '').replace(')\r', '').split(', ').map(el => el.trim()) }
  })
  return instructions;
}

function createTree(dataStructure: NodeData[]) {
  const nodeMap: Record<string, Node> = {};
  if (dataStructure.length < 0) {
    return null
  }
  dataStructure.forEach(el => {
    const newNode: Node = { id: el.node.trim() };
    nodeMap[el.node.trim()] = newNode;
  })

  dataStructure.forEach(el => {
    const currentNode = nodeMap[el.node.trim()];
    const [leftElement, rightElement] = el.elements.map(el => el.trim());
    if (leftElement) {
      currentNode.left = nodeMap[leftElement];
    }
    if (rightElement) {
      currentNode.right = nodeMap[rightElement];
    }
  })
  return nodeMap[dataStructure[0].node.trim()]
}

function countSteps(root: Node, targetEl: string, steps: string[]) {
  let currentNode = root;
  let stepsCounter = 0;
  steps.pop();
  while (currentNode.id !== 'ZZZ') {
    let counter = 0;
    steps.forEach(step => {
      if (step === 'L' && currentNode.left) {
        currentNode = currentNode.left;
      } else if (step === 'R' && currentNode.right) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode;
      }
      counter++;
      stepsCounter++;
    })
  }
  return stepsCounter;
}
