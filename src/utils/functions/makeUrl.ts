export const makeUrl = (baseUrl: string, query: Record<string, string | number>) => {
  const url = new URL(baseUrl)
  for (const key in query) {
    if (Object.prototype?.hasOwnProperty.call(query, key)) {
      const value = query[key]
      url.searchParams.append(key, value.toString())
    }
  }
  return url.toString()
}
