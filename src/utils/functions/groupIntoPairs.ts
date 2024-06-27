export function groupIntoPairs<T>(array: T[]) {
  const result = [];
  for (let i = 0; i < array.length; i += 2) {
    if (i + 1 < array.length) {
      result.push([array[i], array[i + 1]]);
    } else {
      result.push([array[i]]);
    }
  }
  return result;
}
