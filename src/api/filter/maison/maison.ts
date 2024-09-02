import { formattedListOfParams } from "@/api/api";
import { paramNameForFirstNLetters, sendFilterRequest } from "../filterApi";
import { getCountryAuctionNamesParam } from "./maisonSearchParams";

export function requestListOfFirstTwoLettersMaisonName(initial: string) {
    return sendFilterRequest('bidwatcher_auction_query_1', paramNameForFirstNLetters('maison_name', 2), {
        search: `${paramNameForFirstNLetters('maison_name', 1)}:${initial}`
    })
}

export function requestListOfMaisonNamesStartingWith(initials: string) {
    return sendFilterRequest('bidwatcher_auction_query_1', 'maison_name', {
        search: `${paramNameForFirstNLetters('maison_name', 2)}:${initials}`
    })
}

export function requestListOfFirstTwoLettresAuctionCity(initial: string, search?: { countryNames: string[] } ) {
    return sendFilterRequest('bidwatcher_auction_query_1', paramNameForFirstNLetters('city_auction_name', 2), {
        search: formattedListOfParams([
            `${paramNameForFirstNLetters('city_auction_name', 1)}:${initial}`,
            `${getCountryAuctionNamesParam(search?.countryNames || null)}`
        ])
        // `${paramNameForFirstNLetters('city_auction_name', 1)}:${initial}` + 
        //         `${getCountryAuctionNamesParam(search?.countryNames || null)}`
    })
}

export function requestListOfAuctionCityNamesStartingWith(initials: string, search?: { countryNames: string[] }) {
    return sendFilterRequest('bidwatcher_auction_query_1', 'city_auction_name', {
        search: formattedListOfParams([
            `${paramNameForFirstNLetters('city_auction_name', 2)}:${initials}`,
            `${getCountryAuctionNamesParam(search?.countryNames || null)}`
        ])
    })
}