export const pick = <T extends {} | Record<string | number | symbol, any>, U extends keyof T>(
  obj: T,
  keys: U[]
): Pick<T, U> => {
  let accumulator: any = {}
  for (const key of keys) {
    if (Object.prototype?.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      accumulator[key] = element
    }
  }
  return accumulator
}
