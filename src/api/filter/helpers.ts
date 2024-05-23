export function arrayToParamsArray(values: string[]) { return values.join("|") }

export function paramStringValue(paramName: string, paramValue: string) { return `${paramName}:${paramValue}`}