/** Omits an array of keys from an object */
export const omit =
  <T extends Record<string, any>>(keys: (keyof T)[]) =>
  (item: T): Partial<T> => {
    return Object.keys(item).reduce((acc: Partial<T>, key: keyof T) => {
      if (!keys.includes(key)) {
        if (typeof item[key] !== "undefined") {
          acc[key] = item[key];
        }
      }
      return acc;
    }, {});
  };
