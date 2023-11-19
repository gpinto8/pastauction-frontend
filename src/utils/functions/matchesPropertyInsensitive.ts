export const matchesPropertyInsensitive = <T extends Record<U, any> & Record<string, any>, U extends keyof T & string>(propName: U, string: string) => (el: T) =>
  el[propName].toLowerCase() === string.toLowerCase();
