<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchByInitials from '../../components/filters/SearchByInitials.vue';
import { requestListOfAuctionCityNamesStartingWith, requestListOfFirstTwoLettresAuctionCity } from '@/api/filter/maison/maison';
import { emptyArray } from '@/utils/functions/EmptyArray';

defineExpose({
    resetFilter
})

const props = defineProps<{
    countriesSelected: string[]
}>()

const selectedCities = defineModel<string[]>({required: true})
const selectedCitiesInitial = ref<null | string>(null)

watch(selectedCitiesInitial, async () => {
    if (selectedCitiesInitial.value == null) return
    try {
        const response = await requestListOfFirstTwoLettresAuctionCity(selectedCitiesInitial.value, { countryNames: props.countriesSelected })
        citiesCoupleLetters.value = response.data.items.map((el: any) => el.left_1)
    } catch (error) {
        console.log(error);
    }
})

const citiesCoupleLetters = ref<string[]>([])
const selectedCitiesFirstTwoLetters = ref<null | string>(null)

watch(selectedCitiesFirstTwoLetters, async () => {
    if (selectedCitiesFirstTwoLetters.value == null) return
    try {
        const response = await requestListOfAuctionCityNamesStartingWith(selectedCitiesFirstTwoLetters.value, { countryNames: props.countriesSelected })
        citiesList.value = response.data.items.map((el: any) => el.city_auction_name)
    } catch (error) {
        console.log(error);
    }
})

let citiesList = ref<string[]>([])

function resetFilter() {
    selectedCitiesInitial.value = null
    selectedCitiesFirstTwoLetters.value = null
    emptyArray(selectedCities.value)
}

</script>

<template>
    <SearchByInitials
        filterName="Auction city"
        v-model="selectedCities"
        v-model:initials="selectedCitiesInitial"
        v-model:twoLettersInitialsList="citiesCoupleLetters"
        v-model:twoLettersInitials="selectedCitiesFirstTwoLetters"
        v-model:values="citiesList"
        />
</template>