const MAX_CACHE_IN_MINUTES = 60
type key = string | number

function isCacheExpired (cacheTime: number, ttlInMinutes: number): boolean {
  return Date.now() - cacheTime > ttlInMinutes * 60 * 1000
}

export function cachable<T> (fn: () => Promise<T>, ttlInMinutes = MAX_CACHE_IN_MINUTES): () => Promise<T> {
  let cache: Promise<T> | null = null
  let lastCacheTime = 0

  const isExpired = () => isCacheExpired(lastCacheTime, ttlInMinutes)
  return () => {
    if (isExpired()) {
      cache = null
      lastCacheTime = Date.now()
    }

    if (!cache) {
      cache = fn().catch((e) => {
        cache = null
        throw e
      })
    }
    return cache
  }
}

export function cachableWithKey<T> (fn: (key: key) => Promise<T>, ttlInMinutes = MAX_CACHE_IN_MINUTES): (key: key) => Promise<T> {
  const cache: Record<string, Promise<T> | null> = {}
  const lastCacheTime: Record<string, number> = {}

  const isExpired = (key: key) => isCacheExpired(lastCacheTime[key], ttlInMinutes)

  return (key: key) => {
    if (isExpired(key)) {
      cache[key] = null
      lastCacheTime[key] = Date.now()
    }

    if (!cache[key]) {
      cache[key] = fn(key).catch((e) => {
        delete cache[key]
        throw e
      })
    }
    return cache[key] as Promise<T>
  }
}