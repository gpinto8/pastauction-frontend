export function alphabetically (a: string, b: string): number {
  console.log(a, b)
  return a.localeCompare(b)
}

export function alphabeticallyByKey<T> (key: keyof T): (a: T, b: T) => number {
  return (a: any, b: any) => {
    return a[key].localeCompare(b[key])
  }
}