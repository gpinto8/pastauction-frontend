/*
Maps the values of an object.
Iteratee is run with value, key, object as arguments

*/
export const mapValues = <
  T extends Record<string, unknown>,
  U extends unknown
>(
  obj: T,
  fn: (v: T[keyof T], k: keyof T, o: T) => U
): { [Property in keyof T]: ReturnType<typeof fn> } =>
  (Object.keys(obj) as (keyof T)[]).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {} as { [Property in keyof T]: ReturnType<typeof fn> });

const x = {
  a: 4,
};
