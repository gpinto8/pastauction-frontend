export function arrayToParamsArray(values: string[]) { return values.join("|") }

export function getBrandsSearchParams(brands: string[]) {
    return brands.length > 0 ? `brand_name:${arrayToParamsArray(brands)}` : ''
}

export function getFamilySearchParams(families: string[]) {
    return families.length > 0 ? `family_name:${arrayToParamsArray(families)}` : ''
}

export function getModelSearchParams(models: string[]) {
    return models.length > 0 ? `model_name:${arrayToParamsArray(models)}` : ''
}

export function getCountriesSearchParams(countries: string[]) {
    return countries.length > 0 ? `country_brand_name:${arrayToParamsArray(countries)}` : ''
}

export function getTypesSearchParams(types: string[]) {
    return types.length > 0 ? `body_type:${arrayToParamsArray(types)}` : ''
}

export function getAttributesSearchParams(attributes: string[]) {
    return attributes.length > 0 ? `body_category:${arrayToParamsArray(attributes)}` : ''
}

export function getPeriodsSearchParams(periods: string[]) {
    return periods.length > 0 ? `age_name:${arrayToParamsArray(periods)}` : ''
}

export function getColorsSearchParams(colors: string[]) {
    return colors.length > 0 ? `color_name:${arrayToParamsArray(colors)}` : ''
}

// TODO: understand how to do this
export function getMiscSearchParams() {
    return ''
}