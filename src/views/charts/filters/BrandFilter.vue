<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { computed, reactive, ref } from 'vue';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let selectedBrandInitial = ref<null | string>(null)
async function selectBrand(letter: string) {
    try {
        selectedBrandInitial.value = letter;
        const response = await axios.get(`/filter/bidwatcher_brand/name_left_2/?search=name_left_1:${letter}`);
        brandsCoupleLetters.value = response.data.items.map((item: any) => item.left_1 as string);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
}

const brandSelected = computed(() => {
    return selectedBrandInitial.value != null
})

// As soon as you choose a letter this array is populated with the first two letters for the choosen selectedBrandInitial variable
let brandsCoupleLetters = ref<string[]>([])
let selectedBrandFirstTwoLetters = ref<null | string>(null)

async function selectCoupleBrand(brandsCoupleLetter: any) {
    try {
        selectedBrandFirstTwoLetters.value = brandsCoupleLetter;

        const response = await axios.get(`/filter/bidwatcher_brand/name/?search=name_left_2:${brandsCoupleLetter}`);
        brandList.value = response.data.items.map((item: any) => item.name as string);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
}

const brandFirstTwoLettersIsSelected = computed(() => {
    return selectedBrandFirstTwoLetters.value != null
})

let brandList = ref<string[]>([])

let selectedBrandNames = defineModel<string[]>({required: true})

function toggleSelectedBrandNames(valueToToggle: string) {
    toggleValueInArray(selectedBrandNames.value, valueToToggle)
}

</script>

<template>
    <div class="flex flex-col">
        <v-row justify="start" class="align-center">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="flat"
                    label
                    size="large"
                    >
                    <small>Brands</small>
                </v-chip>
                    <v-btn
                        v-for="letter in alphabet"
                        :key="letter"
                        class="letter-button"
                        :variant="selectedBrandInitial === letter ? 'elevated' : 'outlined'"
                        @click="selectBrand(letter)"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                        {{ letter }}
                    </v-btn>
            </v-col>
        </v-row>
        <v-row justify="start" class="align-center mt-0">
            <v-col class="d-flex flex-wrap align-center pt-0">
                <div :class="{ 'd-block': selectedBrandInitial, 'd-none': !selectedBrandInitial }" class="mt-3" justify="start" >
                    <v-btn
                        v-for="coupleLetters in brandsCoupleLetters" 
                        :key="coupleLetters"
                        class="letter-button"
                        :variant="selectedBrandFirstTwoLetters === coupleLetters ? 'elevated' : 'outlined'"
                        @click="selectCoupleBrand(coupleLetters)"
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
                <div :class="{ 'd-block': selectedBrandFirstTwoLetters, 'd-none': !selectedBrandFirstTwoLetters }" class="mt-3">
                    <v-row justify="start" class="align-center">
                        <v-col
                        >
                        <v-chip
                            v-for="(brand, index) in selectedBrandNames"
                            :key="index"
                            class="m-2"
                            closable
                            color="black"
                            style="border-radius: 5px;"
                            variant="flat"
                            @click:close="toggleValueInArray(selectedBrandNames, brand)"
                        >
                            {{ brand }}
                        </v-chip>
                        </v-col>
                    </v-row>
                    <v-row class="letter-button border-brand" color="black" text>
                        <v-col 
                            v-for="brand in brandList" 
                            :key="brand" 
                            cols="12" sm="6" md="4" lg="3">
                            <div href="#" 
                            :class="{ 'selected': selectedBrandNames.includes(brand) }" 
                            class="m-3" 
                            style="font-size: 16px;" 
                            @click="toggleValueInArray(selectedBrandNames, brand)">
                                {{ brand }}
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>