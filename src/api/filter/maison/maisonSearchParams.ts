import { arrayToParamsArray, numberArrayToParamsArray } from "../vehicles/vehicleSearchParams";

export function getAcutionYearParam(year: number[]) {
    return year.length > 0 ? `auction_year:${numberArrayToParamsArray(year)}` : ''
}

export function getNameEventParam(nameEvent: string) {
    return `name_event:${nameEvent}`
}

export function getAuctionAreaParam(auctionArea: string[]) {
    return auctionArea.length > 0 ? `auction_area:${arrayToParamsArray(auctionArea)}` : ''
}

export function getCountryAuctionNamesParam(countryAuctionNames: string[] | null): string {
    return countryAuctionNames != null && countryAuctionNames.length > 0 ? `country_auction_name:${arrayToParamsArray(countryAuctionNames)}` : '';
  }

export function getCityAuctionNameParam(cityNames: string[]): string {
    return cityNames.length > 0 ? `city_auction_name:${arrayToParamsArray(cityNames)}` : '';
  }

export function getAuctionNameParam(auctionNames: string[]): string {
    return auctionNames.length > 0 ? `auction_name:${arrayToParamsArray(auctionNames)}` : '';
  }
  

export function getCountryMaisonParam(countryMaison: string[]): string {
    return countryMaison.length > 0 ? `country_maison:${arrayToParamsArray(countryMaison)}` : '';
  }

export function getMaisonNameParam(maisonName: string[]): string {
    return maisonName.length > 0 ? `maison_name:${arrayToParamsArray(maisonName)}` : '';
}

export function getAuctionDataParam(auctionData: string[]): string {
    return auctionData.length > 0 ? `auction_data:${arrayToParamsArray(auctionData)}` : '';
}

export function getAuctionTypeParam(auctionType: string[]): string {
    return auctionType.length > 0 ? `auction_type:${arrayToParamsArray(auctionType)}` : '';
}

export function getAgeNameParam(ageNames: string[]): string {
    return ageNames.length > 0 ? `age_name:${arrayToParamsArray(ageNames)}` : '';
}