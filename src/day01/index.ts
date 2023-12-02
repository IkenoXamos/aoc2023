import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const firstDigit = /^\D*(\d)/; // Consider using /(\d)(?=\d)*/
const lastDigit = /(\d)(?!.*\d)/; // Consider using /(\d)(?!\d)+/

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const values = input.map(line => +`${firstDigit.exec(line)?.at(-1)}${lastDigit.exec(line)?.at(-1)}`);

  return values.reduce((a, b) => a + b, 0);
};

const firstDigitWord = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
const lastDigitWord = /(sevenine|oneight|threeight|fiveight|nineight|twone|eightwo|\d|one|two|three|four|five|six|seven|eight|nine)(?!.*\d)(?!.*one)(?!.*two)(?!.*three)(?!.*four)(?!.*five)(?!.*six)(?!.*seven)(?!.*eight)(?!.*nine)/;
const parseInt = (number: string): number => {
  switch(number) {
    case "twone":
    case "one":
      return 1
    case "eightwo":
    case "two":
      return 2
    case "three":
      return 3
    case "four":
      return 4
    case "five":
      return 5
    case "six":
      return 6
    case "seven":
      return 7
    case "oneight":
    case "threeight":
    case "fiveight":
    case "nineight":
    case "eight":
      return 8
    case "sevenine":
    case "nine":
      return 9
    default:
      return +number
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const values = input.map(line => +`${parseInt(firstDigitWord.exec(line)?.at(-1) || '')}${parseInt(lastDigitWord.exec(line)?.at(-1) || '')}`);

  return values.reduce((a, b) => a + b, 0);
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
