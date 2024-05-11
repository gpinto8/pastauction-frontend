import { paramNameForFirstNLetters, sendFilterRequest } from "../filterApi";

export function requestListOfFirstTwoLettersMaisonName(initial: string) {
    return sendFilterRequest('bidwatcher_auction_query_1', paramNameForFirstNLetters('name_event', 2), {
        search: `${paramNameForFirstNLetters('name_event', 1)}:${initial}`
    })
}

export function requestListOfMaisonNamesStartingWith(initials: string) {
    return sendFilterRequest('bidwatcher_auction_query_1', 'name_event', {
        search: `${paramNameForFirstNLetters('name_event', 2)}:${initials}`
    })
}

export function requestListOfFirstTwoLettresAuctionCity(initial: string) {
    return sendFilterRequest('bidwatcher_auction_query_1', paramNameForFirstNLetters('city_auction_name', 2), {
        search: `${paramNameForFirstNLetters('city_auction_name', 1)}:${initial}`
    })
}

export function requestListOfAuctionCityNamesStartingWith(initials: string) {
    return sendFilterRequest('bidwatcher_auction_query_1', 'city_auction_name', {
        search: `${paramNameForFirstNLetters('city_auction_name', 2)}:${initials}`
    })
}