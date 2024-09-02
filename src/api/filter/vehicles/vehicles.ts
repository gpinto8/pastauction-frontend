import axios from "axios";

export function categoryOfFamilyType(familyName: string) {
    return axios.get('/filter/filter_charts_vehicles/body_category/', {
        params: {
            search: `body_type:${familyName}`
        }
    });
}

export function bodyShapeOfCategoryType(categoryName: string, familyName: string) {
    return axios.get('/filter/filter_charts_vehicles/body_shape/', {
        params: {
            search: `body_category:${categoryName},body_type:${familyName}`
        }
    });
}

export function vehiclesCountryBrandArea() {
    return axios.get('/filter/filter_charts_vehicles/country_brand_area/');
}