import axios from "axios";

export function queryBidwatcherProductDash(category: string, type: string) {
    return axios.get('/bidwatcher_product_dash/query', {
        params: {
            category,
            type
        }
    })
}