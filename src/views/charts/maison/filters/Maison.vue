<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import axios from 'axios';
import { defineModel, ref, watch } from 'vue';
import SearchByInitials from '../../components/filters/SearchByInitials.vue';

const toggle = ref(false)

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

defineExpose({
    resetFilter
})
const selectedMaisonNames = defineModel<string[]>({required: true})
const selectedMaisonInitial = ref<null | string>(null)

// update the two-letter initials array when changing the brand initial letter
watch(selectedMaisonInitial, async () => {
    try {
        const response = await axios.get(`/filter/bidwatcher_auction/name_left_2/?search=name_left_1:${selectedMaisonInitial.value}`);
        maisonsCoupleLetters.value = response.data.items.map((item: any) => item.left_1 as string);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
})

// As soon as you choose a letter this array is populated with the first two letters for the choosen selectedBrandInitial variable
const maisonsCoupleLetters = ref<string[]>([])
const selectedMaisonsFirstTwoLetters = ref<null | string>(null)

let maisonList = ref<string[]>([])

// update brandList every time we choose new two-letter initials
watch(selectedMaisonsFirstTwoLetters, async () => {
    try {
        const response = await axios.get(`/filter/bidwatcher_auction/name/?search=name_left_2:${selectedMaisonsFirstTwoLetters.value}`);
        maisonList.value = response.data.items.map((item: any) => item.name as string);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
})

function resetFilter() {
    emptyArray(selectedMaisonNames.value)
    selectedMaisonInitial.value = null
    selectedMaisonsFirstTwoLetters.value = null
    emptyArray(maisonsCoupleLetters.value)
}

</script>

<template>
    <SearchByInitials
        filterName="Maison"
        v-model="selectedMaisonNames"
        v-model:initials="selectedMaisonInitial"
        v-model:twoLettersInitialsList="maisonsCoupleLetters"
        v-model:twoLettersInitials="selectedMaisonsFirstTwoLetters"
        v-model:values="maisonList"
        />
</template>