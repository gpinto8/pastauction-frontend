/**
 * Same as find but from the end of an array
 */
export const findRight = <T>(arr: T[], iteratee: (value: T, key: keyof T[], arr: T[]) => boolean) => {
    let found: T | undefined;
    for (let index = arr.length - 1; index >= 0; index--) {
        const element = arr[index];
        if(iteratee(element, index, arr)) {
            return element
        }
    }
    return found;
}