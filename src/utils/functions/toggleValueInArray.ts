export function toggleValueInArray(array: any[], value: any) {

    let index = array.indexOf(value)

    if (index == -1) {
        array.push(value)
    }
    else {
        array.splice(index, 1)
    }

}