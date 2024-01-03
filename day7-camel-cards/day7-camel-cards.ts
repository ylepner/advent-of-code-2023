import { readFile } from "fs/promises";
import path from "path";
import { identifierToKeywordKind } from "typescript";

interface HandData {
  hand: string,
  label: number,
  bid: number,
}

async function solve() {
  const file = path.join(__dirname, './data.txt');
  const data = parseData(await readFile(file, { encoding: 'utf-8' }));
  const hands: HandData[] = data.map(handAndBit => identifyHand(handAndBit[0].split(''), handAndBit[1]));
  const sorted = hands.sort(sortHands);
  console.log(sorted);
  const result = calculateTotalWinnings(sorted);
  console.log(result);
}

solve();

function parseData(data: string) {
  return data.split('\n').map(el => el.trim().split(' '));
}

function identifyHand(cards: string[], bid: string) {
  const cardCounts: { [key: string]: number } = {};
  const labels = new Set();


  cards.forEach(card => {
    labels.add(card);
    cardCounts[card] = (cardCounts[card] || 0) + 1;
  });

  const labelCount = Object.values(cardCounts).sort((a, b) => b - a).join('');
  let label: number = 0;
  let cardsString: string = cards.join('');

  if (labelCount === '5') {
    label = 7
  } else if (labelCount === '41') {
    label = 6
  } else if (labelCount === '32') {
    label = 5
  } else if (labelCount === '311') {
    label = 4
  } else if (labelCount === '221') {
    label = 3
  } else if (labelCount === '2111') {
    label = 2
  } else {
    label = 1
  }

  return {
    hand: cardsString,
    label: label,
    bid: Number(bid)
  }
}

const handStrength = {
  'Five of a kind': 7,
  'Four of a kind': 6,
  'Full house': 5,
  'Three of a kind': 4,
  'Two pair': 3,
  'One pair': 2,
  'High card': 1,
};


const cardStrength: { [key: string]: number } = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1
};

function sortHands(a: HandData, b: HandData): number {

  const labelDiff = a.label - b.label;

  if (labelDiff < 0) {
    return -1
  } else if (labelDiff > 0) {
    return 1
  } else {
    const checkStrength = compareCardsStrength(a.hand, b.hand);
    return checkStrength;
  }

}

function calculateTotalWinnings(sortedHands: HandData[]): number {
  let totalWinnings = 0;
  for (let rank = sortedHands.length; rank > 0; rank--) {
    const hand = sortedHands[sortedHands.length - rank];
    const winnings = rank * hand.bid;
    totalWinnings += winnings;
  }

  return totalWinnings;
}

function compareCardsStrength(handA: string, handB: string) {
  for (let i = 0; i < handA.length; i++) {
    const diff = cardStrength[handA[i]] - cardStrength[handB[i]];
    if (diff === 0) {
      continue
    } else if (diff < 0) {
      return -1
    } else {
      return 1
    }
  }
  return 0
}
