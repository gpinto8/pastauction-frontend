/**
 * Check whether the value is empty.
 * It is when undefined, null, NaN, [], {}, '', empty Map or Set
 */

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    Number.isNaN(value) ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (value instanceof Map && [...value.keys()].length === 0) ||
    (value instanceof Set && [...value.keys()].length === 0) 
  );
};
