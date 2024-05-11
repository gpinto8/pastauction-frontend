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