/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export const findAllIndexes = <T>(arr: T[], predicate: (item: T) => boolean): number[] => {
    return arr.map((item, index) => predicate(item) ? index : undefined).filter(index => index !== undefined) as number[];
};

export function consecutiveRanges(source: number[]): number[][] {
  const ranges: number[][] = []; // Hold all of the possible continuous sequences
  let currentRange: number[] = []; // The current continuous sequence being built
  source.forEach(item => {
    if (currentRange.length === 0) { // If this is the beginning of a new sequence
      currentRange.push(item); // Add it
    } else if (item - currentRange[currentRange.length - 1] === 1) { // Otherwise, if this is sequential with the previous item
      currentRange.push(item); // Add it
    } else { // If it isn't, the previous sequence ends and we start a new one
      ranges.push(currentRange);
      currentRange = [item];
    }
  });
  if (currentRange.length > 0) { // Handle edge-case where the final sequence wasn't added yet
    ranges.push(currentRange);
  }
  return ranges;
}