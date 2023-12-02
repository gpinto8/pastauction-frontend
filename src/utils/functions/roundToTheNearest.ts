/**
 * Provided with a unit returns a Fn that rounds a number to its nearest multiple of that unit.
 * 
 * const toFive = roound...est(5);
 * 
 * toFive(12) // 10
 */

const roundToTheNearest = (unit: number) => (number: number) =>
Math.round(number / unit) * unit;