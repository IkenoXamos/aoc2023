import run from "aocrunner";

/** A description of how many cubes of a particular color were revealed */ 
type Set = {
  amount: number;
  color: string;
};

/** A collection of revealed cubes */
type Group = Set[];

/** A full game */
type Game = {
  index: number;
  groups: Group[];
};

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => {
  const index = +line.split(':')[0].split(' ')[1];
  const groups = line.split(':')[1].split(';').map(game => {
    const cubesShown = game.trim().split(',').map(cube => {
      const amount = +cube.trim().split(' ')[0];
      const color = cube.trim().split(' ')[1];

      return { amount, color };
    });

    return cubesShown as Group;
  });

  return { index, groups } as Game;
});

function maxAmountOfColor({ groups }: Game, color: string): number {
  return groups.map(group => group
      .filter((set) => set.color === color) // Find the set where desired color cubes are shown
      .map(({ amount }) => amount) // And find the amount
      .reduce((a, b) => a > b ? a : b, 0) // Consider only the highest amount from that set
  ).reduce((a, b) => a > b ? a : b, 0); // consider only the highest amount of that color from the entire game
}

const part1 = (rawInput: string) => {
  const games = parseInput(rawInput);

  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;
  const possibleGames = games.filter(game => {
    const red = maxAmountOfColor(game, 'red');
    const green = maxAmountOfColor(game, 'green');
    const blue = maxAmountOfColor(game, 'blue');

    return red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE;
  });

  return possibleGames.reduce((acc, { index }) => acc + index, 0); // Add up the ID of each game
};

const part2 = (rawInput: string) => {
  const games = parseInput(rawInput);

  const powers = games.map(game => { // For each game
    // Calculate the minimum required amount of marbles needed for the game to be valid
    const requiredRed = maxAmountOfColor(game, 'red');
    const requiredGreen = maxAmountOfColor(game, 'green');
    const requiredBlue = maxAmountOfColor(game, 'blue');

    // And compute the 'power' of the game
    return requiredRed * requiredGreen * requiredBlue;
  });

  return powers.reduce((acc, power) => acc + power, 0); // Add up the powers
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
