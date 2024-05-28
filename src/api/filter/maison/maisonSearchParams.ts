import { arrayToParamsArray } from "../vehicles/vehicleSearchParams";

export function getAcutionYearParam(year: number) {
    return `auction_year:${year}`
}

export function getNameEventParam(nameEvent: string) {
    return `name_event:${nameEvent}`
}

export function getAuctionAreaParam(auctionArea: string[]) {
    return `auction_area:${arrayToParamsArray(auctionArea)}`
}

export function getCountryAuctionNamesParam(countryAuctionNames: string[]) {
    return `country_auction_name:${arrayToParamsArray(countryAuctionNames)}`
}

export function getCityAuctionNameParam(cityNames: string[]) {
    return `city_auction_name:${arrayToParamsArray(cityNames)}`
}

export function getAuctionNameParam(auctionNames: string[]) {
    return `auction_name:${arrayToParamsArray(auctionNames)}`
}

export function getcountryMaisonParam(countryMaison: string[]) {
    return `country_maison:${arrayToParamsArray(countryMaison)}`
}

export function getMaisonNameParam(maisonName: string[]) {
    return `maison_name:${arrayToParamsArray(maisonName)}`
}

export function getAuctionDataParam(auctionData: string[]) {
    return `auction_data:${arrayToParamsArray(auctionData)}`
}

export function getAuctionTypeParam(auctionType: string[]) {
    return `auction_type:${arrayToParamsArray(auctionType)}`
}

export function getAgeNameParam(ageNames: string[]) {
    return `age_name:${arrayToParamsArray(ageNames)}`
}