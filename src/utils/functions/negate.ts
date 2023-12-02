/**
 * Creates a function that negates the result of the predicate function.
 */

export const negate =
  <T extends (...args: any[]) => unknown>(fn: T) =>
  (...args: Parameters<T>) =>
    !fn(...args);