/* 
TS friendly version of includes
*/

export const includes = <T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T => {
  return coll.includes(el as T);
};
