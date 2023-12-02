/**
 * Set a value inside an object with its path: example: set({}, 'a.b.c', '...') => { a: { b: { c: '...' } } }
 * If one of the keys in path doesn't exists in object, it'll be created.
 *
 * @param object Object to manipulate
 * @param path Path to the object field that need to be created/updated
 * @param value Value to set
 */
export const set = (
  object: { [key: string | number | symbol]: any },
  path: string | number | (string | number)[],
  value: any
) => {
  const decomposedPath = ([] as (number | string)[]).concat(path).join('.').split('.')
  const key = decomposedPath[0]
  const base = /\d+/.test(key) ? Number(key) : key
  if (base === undefined) {
    return object
  }

  // assign an empty object in order to spread object
  if (!object?.hasOwnProperty(base)) {
    object[base] = {}
  }

  // Determine if there is still layers to traverse
  value = decomposedPath.length <= 1 ? value : set(object[base], decomposedPath.slice(1).join('.'), value)
  if (Array.isArray(object) && typeof base === 'number') {
    let arr = [...object]
    arr[base] = value
    return arr
  }
  return {
    ...object,
    [base]: value
  }
}
