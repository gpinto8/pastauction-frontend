<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { ref, defineModel, watch } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue'


const toggle = ref(false)

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

defineExpose({
    resetFilter
})
const selectedBrandNames = defineModel<string[]>({required: true})
const selectedBrandInitial = ref<null | string>(null)

// update the two-letter initials array when changing the brand initial letter
watch(selectedBrandInitial, async () => {
    try {
        const response = await axios.get(`/filter/bidwatcher_brand/name_left_2/?search=name_left_1:${selectedBrandInitial.value}`);
        brandsCoupleLetters.value = response.data.items.map((item: any) => item.left_1 as string);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
})

// As soon as you choose a letter this array is populated with the first two letters for the choosen selectedBrandInitial variable
const brandsCoupleLetters = ref<string[]>([])
const selectedBrandFirstTwoLetters = ref<null | string>(null)

let brandList = ref<string[]>([])

// update brandList every time we choose new two-letter initials
watch(selectedBrandFirstTwoLetters, async () => {
    try {
        const response = await axios.get(`/filter/bidwatcher_brand/name/?search=name_left_2:${selectedBrandFirstTwoLetters.value}`);
        brandList.value = response.data.items.map((item: any) => item.name as string);
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
})

function resetFilter() {
    emptyArray(selectedBrandNames.value)
    selectedBrandInitial.value = null
    selectedBrandFirstTwoLetters.value = null
    emptyArray(brandsCoupleLetters.value)
}

</script>

<template>
    <GenericFilter filterName="Brands">
        <div class="flex flex-col">
            <v-row justify="start" class="align-center" no-gutters>
                <v-col class="d-flex flex-wrap align-center" no-gutters>
                    <v-btn
                        v-for="letter in alphabet"
                        :key="letter"
                        class="letter-button !h-10 aspect-square"
                        :variant="selectedBrandInitial === letter ? 'elevated' : 'outlined'"
                        @click="selectedBrandInitial = letter"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 2px !important"
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
                            class="letter-button h-10 aspect-square"
                            :variant="selectedBrandFirstTwoLetters === coupleLetters ? 'elevated' : 'outlined'"
                            @click="selectedBrandFirstTwoLetters = coupleLetters"
                            color="black"
                            style="min-width: 20px; margin: 2px; border-radius: 2px !important; font-size: 10px;"
                        >
                            {{ coupleLetters }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedBrandFirstTwoLetters, 'd-none': !selectedBrandFirstTwoLetters }" class="mt-3 w-full">
                        <div class="flex flex-col">
                            <div class="flex flex-wrap" noGutters>
                                <v-chip
                                    noGutters
                                    v-for="(brand, index) in selectedBrandNames"
                                    :key="`${brand}-index`"
                                    class="mr-2 mb-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    :text="brand"
                                    @click:close="toggleValueInArray(selectedBrandNames, brand)"
                                >
                                </v-chip>
                            </div>
                        </div>
                        <div class="border !border-black grid grid-cols-3 lg:grid-cols-5 gap-y-2 p-2" text>
                            <button
                            v-for="brand in brandList" 
                            :key="brand"
                            class="flex-center text-center"
                            :class="{ 'selected': selectedBrandNames.includes(brand) }" 
                            style="font-size: 16px; border-radius: 2px !important" 
                            @click="toggleValueInArray(selectedBrandNames, brand)">
                                {{ brand }}
                            </button>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </GenericFilter>
</template>