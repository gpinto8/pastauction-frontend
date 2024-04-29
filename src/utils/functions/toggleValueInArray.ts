export function toggleValueInArray<T>(array: T[], value: T) {

    let index = array.indexOf(value)

    if (index == -1) {
        array.push(value)
    }
    else {
        array.splice(index, 1)
    }

}