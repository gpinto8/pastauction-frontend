// Empties an array. We use splice so if the array is a ref then the reactivness won't break

export function emptyArray(arr: any[]) {
    arr.splice(0, arr.length)
}