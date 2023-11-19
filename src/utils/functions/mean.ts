import { add } from "./add";

/**
 * Computed the mean of a list of numbers either passed as arguments or as an array
 */
export const mean = (...numbers: (number | number[])[]) => {
    const elements: number[] = numbers.flat(1);
    return elements.reduce(add, 0) / Math.max(1, elements.length)
}