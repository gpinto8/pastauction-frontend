export function emptyReactiveObject(object: { [key in any]: any }) {
    Object.keys(object).forEach(key => delete object[key]);
}