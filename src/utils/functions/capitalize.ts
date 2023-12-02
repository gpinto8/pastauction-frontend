/**
 * Converts the first character of string to upper case and the remaining to lower case.
 */

export const capitalize = (string: string) =>
  string.slice(0, 1).toUpperCase().concat(string.slice(1).toLowerCase());
