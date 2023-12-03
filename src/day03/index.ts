import run from "aocrunner";
import { findAllIndexes, consecutiveRanges } from '../utils/index.js'

const parseInput = (rawInput: string) => rawInput.split('\n').map((line, y_index) => {
  // Find all positions of numbers in the line
  const numberIndices = findAllIndexes(line.split(''), (char) => !!char.match(/[0-9]/));
  // Within those positions, find all ranges of numbers that are consecutive
  // These will be used to determine the actual value, combining sequential digits together
  const numberRanges = consecutiveRanges(numberIndices);

  // We associate the value with each of the positions that number occupied
  const values = numberRanges.map(range => ({
    value: parseInt(range.map(index => line[index]).join('')),
    positions: range.map(index => [index, y_index] as [number, number]),
  }));

  // Find all of the positions of the symbols in the line
  const symbols = findAllIndexes(line.split(''), (char) => !!char.match(/[^.0-9]/)).map(index => [index, y_index] as [number, number]);
  // Also specifically track the positions of the '*'s for Part 2
  const gears = findAllIndexes(line.split(''), (char) => !!char.match(/[*]/)).map(index => [index, y_index] as [number, number]);

  return {
    values,
    symbols,
    gears,
  };
}).reduce((acc, { values, symbols, gears }) => { // Combine all of the values into a single array for easier processing
  return {
    values: acc.values.concat(values),
    symbols: acc.symbols.concat(symbols),
    gears: acc.gears.concat(gears),
  }
}, { values: [], symbols: [], gears: [] });

function isNeighbor(target: [number, number], source: [number, number][]): boolean {
  return source.some(([x, y]) => Math.abs(target[0] - x) <= 1 && Math.abs(target[1] - y) <= 1);
}

const part1 = (rawInput: string) => {
  const { values, symbols } = parseInput(rawInput);

  // Out of all of the values in the display, only keep the ones that have at least one symbol adjacent to them
  // And grab the value of that number
  const includedNumbers = values.filter(item => item.positions.some(position => isNeighbor(position, symbols))).map(item => item.value);

  // Add up all of the values
  return includedNumbers.reduce((acc, value) => acc + value, 0);
};

const part2 = (rawInput: string) => {
  // values includes all of the metadata about the positions/values of the numbers in the display
  // gears includes all of the metadata about the positions/values of the '*'s in the display
  const { values, gears } = parseInput(rawInput);

  // Out of the '*'s in the display, we only care about the ones that have exactly 2 adjacent numbers
  const correctGears = gears.map(position => {
    // We find all of the numbers that are adjacent to this '*'
    const neighbors = values.filter(item => isNeighbor(position, item.positions));

    // Only if there are exactly 2 numbers adjacent,
    if (neighbors.length === 2) return neighbors; // Hold on to those numbers metadata
    return null; // Otherwise return null

    // Filter out the nulls
    // The typing gets a bit complex here, but its an array of pairs of 'number's
    // But each 'number' includes its value and a range of positions
  }).filter(item => item !== null) as { value: number, positions: [number, number][] }[][];

  // From there, calculate and add up the gear ratio of the found gears
  return correctGears.reduce((acc, gears) => acc + gears[0].value * gears[1].value, 0);
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
