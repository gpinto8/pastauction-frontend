import { identity } from "./identity";

export const flattenTree = <T extends Record<string, any>>(
  items: T[],
  keyName: keyof T,
  mapper: (item: T) => unknown = identity
): ReturnType<typeof mapper>[] => {
  return items
    .map((item) => {
      if (Array.isArray(item[keyName])) {
        return [mapper(item), ...flattenTree(item[keyName], keyName, mapper)];
      }
      return [mapper(item)];
    })
    .flat();
};
