import axios from "axios";
import { arrayToParamsArray, paramStringValue } from "../helpers";

/* 
    This method retrieves the data of the charts of a product (a product is a Single dashboard, Minidashboard or a full dashboard)
*/
export async function chartsOfProduct(category: string, type: string) {
    let response = await queryBidwatcherProductDash({ category: category, type: type })
    console.log(response.data.items);

    let products: any[] = response.data.items

    const chartIdsByProduct = (await Promise.all(products.map(product => querybidwatcherProductChartSelected({ id_product_dash: product.id }))))
    .map(response => response.data.items.map((item: any) => item.id_product_chart))
    console.log(chartIdsByProduct);

    const chartsOfProduct = (await Promise.all(chartIdsByProduct.map((chartIds: number[]) => {
        return Promise.all(chartIds.map(chartId => querybidwatcherProductChart({id_product_chart: '' + chartId})))
    })))
    return chartsOfProduct
}

export function queryBidwatcherProductDash(query: {category: string, type: string}) {
    return axios.get('/bidwatcher_product_dash/query', {
        params: {
            search: [getCategorySearchParams([query.category]), getTypeSearchParams([query.type])].join(',')
        }
    })
}

function getCategorySearchParams(category: string[]) {
    return `category:${arrayToParamsArray(category)}`
}

function getTypeSearchParams(type: string[]) {
    return `type:${arrayToParamsArray(type)}`
}

export function querybidwatcherProductChartSelected(query: {id_product_dash: string}) {
    return axios.get('/bidwatcher_product_chart_selected/query', {
        params: {
            search: paramStringValue('id_product_dash', query.id_product_dash)
        }
    })
}

export function querybidwatcherProductChart(query: {id_product_chart: string}) {
    return axios.get('/bidwatcher_product_chart/query', {
        params: {
            search: paramStringValue('id', query.id_product_chart)
        }
    })
}