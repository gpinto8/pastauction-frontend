/**
 * Creates a function that returns true only if all the iteratees return true
 */
const overEvery = <V extends ((...args: any[]) => boolean)>(iteratees: V[]) => {
    return <T>(item: T) => iteratees.every(iteratee => iteratee(item))
}