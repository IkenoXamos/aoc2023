import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const firstDigit = /^\D*(\d)/;
const lastDigit = /(\d)(?!.*\d)/;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const values = input.map(line => +`${firstDigit.exec(line)?.at(-1)}${lastDigit.exec(line)?.at(-1)}`);

  return values.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
