export function alphabetically (a: string, b: string): number {
  console.log(a, b)
  return a.localeCompare(b)
}

export function alphabeticallyByKey<T> (key: keyof T): (a: T, b: T) => number {
  return (a: any, b: any) => {
    return a[key].localeCompare(b[key])
  }
}

export function ascending (a: number, b: number): number {
  return a - b
}

export function descending (a: number, b: number): number {
  return b - a
}

export function ascendingByKey<T> (key: keyof T): (a: T, b: T) => number {
  return (a: any, b: any) => {
    return descending(a[key], b[key])
  }
}

export function descendingByKey<T> (key: keyof T): (a: T, b: T) => number {
  return (a: any, b: any) => {
    return ascending(a[key], b[key])
  }
}
