import { readFile } from "fs/promises";
import path from "path";
import { identifierToKeywordKind } from "typescript";

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
  const cardCounts: { [key: string]: number } = {}; // Add index signature to cardCounts
  const labels = new Set();


  cards.forEach(card => {
    labels.add(card);
    cardCounts[card] = (cardCounts[card] || 0) + 1;
  });

  const labelCount = Object.values(cardCounts).sort((a, b) => b - a).join('');
  let label: number = 0;
  let cardsString: string = cards.join('');

  if (labelCount === '5') {
    label = 1
  } else if (labelCount === '41') {
    label = 2
  } else if (labelCount === '32') {
    label = 3
  } else if (labelCount === '311') {
    label = 4
  } else if (labelCount === '221') {
    label = 5
  } else if (labelCount === '2111') {
    label = 6
  } else {
    label = 7
  }

  return {
    hand: cardsString,
    label: label,
    bid: Number(bid)
  }
}

const handStrength = {
  'Five of a kind': 1,
  'Four of a kind': 2,
  'Full house': 3,
  'Three of a kind': 4,
  'Two pair': 5,
  'One pair': 6,
  'High card': 7,
};

interface HandData {
  hand: string,
  label: number,
  bid: number
}
const cardStrength: { [key: string]: number } = {
  A: 1,
  K: 2,
  Q: 3,
  J: 4,
  T: 5,
};

function getCardStrength(card: string): number {
  return cardStrength[card[0]];
}

function sortHands(a: HandData, b: HandData): number {
  const rankDiff = a.label - b.label;

  if (rankDiff !== 0) {
    return rankDiff;
  } else {
    const strengthA = getCardStrength(a.hand);
    const strengthB = getCardStrength(b.hand);

    if (strengthA !== strengthB) {
      return strengthA - strengthB;
    } else {
      const firstCardA = cardStrength[a.hand.charAt(0)] || 0;
      const firstCardB = cardStrength[b.hand.charAt(0)] || 0;

      return firstCardA - firstCardB;
    }
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