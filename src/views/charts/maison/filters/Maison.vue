<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { defineModel, ref, watch } from 'vue';
import GenericFilter from '../../filters/GenericFilter.vue';

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
    <GenericFilter filterName="Maison">
        <div class="flex flex-col">
            <v-row justify="start" class="align-center" no-gutters>
                <v-col class="d-flex flex-wrap align-center" no-gutters>
                    <v-btn
                        v-for="letter in alphabet"
                        :key="letter"
                        class="letter-button w-10 h-10"
                        :variant="selectedMaisonInitial === letter ? 'elevated' : 'outlined'"
                        @click="selectedMaisonInitial = letter"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                        {{ letter }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedMaisonInitial, 'd-none': !selectedMaisonInitial }" class="mt-3" justify="start" >
                        <v-btn
                            v-for="coupleLetters in maisonsCoupleLetters" 
                            :key="coupleLetters"
                            class="letter-button w-10 h-10"
                            :variant="selectedMaisonsFirstTwoLetters === coupleLetters ? 'elevated' : 'outlined'"
                            @click="selectedMaisonsFirstTwoLetters = coupleLetters"
                            color="black"
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                            {{ coupleLetters }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedMaisonsFirstTwoLetters, 'd-none': !selectedMaisonsFirstTwoLetters }" class="mt-3 w-full">
                        <div class="flex flex-col">
                            <div class="flex flex-wrap" noGutters>
                                <v-chip
                                    noGutters
                                    v-for="(maison, index) in selectedMaisonNames"
                                    :key="`${maison}-index`"
                                    class="mr-2 mb-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    :text="maison"
                                    @click:close="toggleValueInArray(selectedMaisonNames, maison)"
                                >
                                </v-chip>
                            </div>
                        </div>
                        <div class="border !border-black grid grid-cols-3 lg:grid-cols-5 gap-y-2 p-2" text>
                            <div
                            v-for="maison in maisonList" 
                            :key="maison"
                            class="flex-center text-center"
                            :class="{ 'selected': selectedMaisonNames.includes(maison) }" 
                            style="font-size: 16px;" 
                            @click="toggleValueInArray(selectedMaisonNames, maison)">
                                {{ maison }}
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </GenericFilter>
</template>