import { wait } from "./wait";
/**
 * Passed a function that returns a promise will retry
 * the promise until it resolves
 */

export const retry = async (
  fn: (...args: any) => unknown,
  tick = 200,
  times = Infinity
): Promise<ReturnType<typeof fn>> => {
  try {
    const res = await fn();
    return res;
  } catch (error) {
    // If times reaches zero rethrow the same error
    if (times === 0) {
      throw error
    }
    await wait(tick)
    return retry(fn, tick, times - 1)
  }
}

