import fs from 'fs/promises';
import path from 'path';

async function solve() {
  const filePath = path.join(__dirname, './data.txt');
  const data = await fs.readFile(filePath, { encoding: 'utf8' });
  const lines = data.split('\n');
  const games = getGames(lines);
  const results = games.reduce((currentSumOfIds, game, index) => {
    if (checkIfAllTrue(game.cubes)) {
      return currentSumOfIds + index + 1
    }
    return currentSumOfIds
  }, 0);
  console.log(results);
}

solve();

function getGames(lines: string[]) {
  const gamesObj = lines.map((line) => {
    const gameNumber = line.split(': ')[0].split('Game ')[1];
    const rounds = line.split(': ')[1];
    const cubes = rounds.split('; ');
    return { gameId: gameNumber, cubes: cubes };
  })
  return gamesObj;
}

function checkIfAllTrue(rounds: string[]) {
  const turnResults = rounds.map((round) => {
    const bag: Record<string, number> = {
      'red': 12,
      'green': 13,
      'blue': 14
    };
    const cubes = round.split(',').map((el) => el.trim());
    const result = cubes.map((cube) => {
      const parts = cube.split(' ').map((el) => el.trim());
      const number = parseInt(parts[0]);
      const cubeColor = parts[1];
      const currentColorNumber = bag[cubeColor];
      if (currentColorNumber == null) {
        throw new Error(`Unsupported color ${cubeColor} `)
      }
      return currentColorNumber >= number;
    })
    return result.every((el) => el);
  });
  return turnResults.every((el) => el);
}

