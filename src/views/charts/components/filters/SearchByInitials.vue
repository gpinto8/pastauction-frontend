<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import { defineModel } from 'vue';
import GenericFilter from '../GenericFilter.vue';

const props = defineProps<{
    filterName: string,
}>()
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

defineExpose({
    resetFilter
})
const selectedValues = defineModel<string[]>({required: true})
const initials = defineModel<null | string>('initials', { required: true })

const twoLettersInitialsList = defineModel<string[]>('twoLettersInitialsList', { required: true })
const twoLettersInitials = defineModel<null | string>('twoLettersInitials', { required: true })

let listOfValues = defineModel<string[]>('values', { required: true })

function resetFilter() {
    emptyArray(selectedValues.value)
    initials.value = null
    twoLettersInitials.value = null
    emptyArray(twoLettersInitialsList.value)
}

</script>

<template>
    <GenericFilter :filterName="filterName">
        <div class="flex flex-col">
            <v-row justify="start" class="align-center" no-gutters>
                <v-col class="d-flex flex-wrap align-center" no-gutters>
                    <v-btn
                        v-for="letter in alphabet"
                        :key="letter"
                        class="letter-button w-10 h-10"
                        :variant="initials === letter ? 'elevated' : 'outlined'"
                        @click="initials = letter"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                        {{ letter }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': initials, 'd-none': !initials }" class="mt-3" justify="start" >
                        <v-btn
                            v-for="coupleLetters in twoLettersInitialsList" 
                            :key="coupleLetters"
                            class="letter-button w-10 h-10"
                            :variant="twoLettersInitials === coupleLetters ? 'elevated' : 'outlined'"
                            @click="twoLettersInitials = coupleLetters"
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
                    <div :class="{ 'd-block': twoLettersInitials, 'd-none': !twoLettersInitials }" class="mt-3 w-full">
                        <div class="flex flex-col">
                            <div class="flex flex-wrap" noGutters>
                                <v-chip
                                    noGutters
                                    v-for="(maison, index) in selectedValues"
                                    :key="`${maison}-index`"
                                    class="mr-2 mb-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    :text="maison"
                                    @click:close="toggleValueInArray(selectedValues, maison)"
                                >
                                </v-chip>
                            </div>
                        </div>
                        <div class="border !border-black grid grid-cols-3 lg:grid-cols-5 gap-y-2 p-2" text>
                            <div
                            v-for="maison in listOfValues" 
                            :key="maison"
                            class="flex-center text-center"
                            :class="{ 'selected': selectedValues.includes(maison) }" 
                            style="font-size: 16px;" 
                            @click="toggleValueInArray(selectedValues, maison)">
                                {{ maison }}
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </GenericFilter>
</template>