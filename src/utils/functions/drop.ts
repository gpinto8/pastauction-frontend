/* 
* Drops N elements from an array and returns a new array. 
* Optionally start at an arbitrary index 
*/
export const drop = <T>(arr: T[], howMany = 0, start = 0) => arr.slice(0, start).concat(arr.slice(start + howMany))