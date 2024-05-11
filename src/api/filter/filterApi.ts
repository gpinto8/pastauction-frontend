import axios from "axios";

export function sendFilterRequest(tableName: string, columnName: string, params?: {
    search?: string,
    sort_by?: string,
    page?: number,
    size?: number,
}) {
    return axios.get(`/filter/${tableName}/${columnName}/`, {
        params
    })
}

export function paramNameForFirstNLetters(paramName: string, n: number) {
    return `${paramName}_left_${n}`
}