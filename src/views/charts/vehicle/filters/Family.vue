<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { ref, watch } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue'

const toggle = ref(false)

const props = defineProps({
    brands: {
        required: true,
        type: Array
    },
})

const familyInitials = ref<string[]>([])

// When brands change update hte family initials
watch(props.brands, async () => {

    if (props.brands.length == 0) { resetFilter() }
    const response = await axios.get('/filter/filter_charts_vehicles/family_name_left_1/', {
        params: {
            search: `brand_name:${props.brands.join('|')}`,
        }
    });

    const familyOptions = response.data.items;

    // Ordina mettendo le lettere prima dei numeri
    familyInitials.value = familyOptions.map((el: any) => el.left_1).sort((a: string, b: string) => {
        // Controlla se a e b sono lettere o numeri
        const isLetterA = isNaN(parseFloat(a));
        const isLetterB = isNaN(parseFloat(b));

        // Se entrambi sono lettere o entrambi sono numeri, ordina normalmente
        if ((isLetterA && isLetterB) || (!isLetterA && !isLetterB)) {
            return a.localeCompare(b);
        }

        // Se a è una lettera e b è un numero, metti a prima di b
        if (isLetterA && !isLetterB) {
            return -1;
        }

        // Se b è una lettera e a è un numero, metti a dopo di b
        if (!isLetterA && isLetterB) {
            return 1;
        }
    })
}, {
    deep: true
})

const selectedFamilyInitial = ref<null | string>(null)
const families = defineModel<string[]>({ required: true })
const availableFamilies = ref<string[]>([])

watch(selectedFamilyInitial, async () => {
    try {
        const response = await axios.get('/filter/filter_charts_vehicles/family_name/', {
            params: {
                search: `brand_name:${props.brands.join('|')}`,
                family_name: selectedFamilyInitial.value
            }
        });

        const filteredFamilies = response.data.items.filter((item: any) => item.family_name.startsWith(selectedFamilyInitial.value));

        availableFamilies.value = filteredFamilies.map((item: any) => item.family_name);
    } catch (error) {
        console.error('Errore nella richiesta GET:', error);
    }
})

function resetFilter() {
    families.value.splice(0, families.value.length)
    familyInitials.value.splice(0, familyInitials.value.length)
    availableFamilies.value.splice(0, availableFamilies.value.length)
    selectedFamilyInitial.value = null
}

</script>

<template>
    <div class="flex flex-col sm:flex-row">
        <GenericFilter filterName="Family" :light="true">
            <div class="flex flex-col w-full">
                <v-row justify="start" class="align-center">
                    <v-col class="d-flex flex-wrap align-center">
                        <p v-if="brands.length === 0">Please, select the Brand of your interest first.</p>
                        <v-btn v-if="familyInitials.length > 0"
                            v-for="familyInitial in familyInitials"
                            :key="'family_' + familyInitial"
                            class="letter-button"
                            :variant="selectedFamilyInitial === familyInitial ? 'elevated' : 'outlined'"
                            @click="selectedFamilyInitial = familyInitial"
                            color="black"
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                            >
                            {{ familyInitial }}
                        </v-btn>
                    </v-col>
                </v-row>
                <div class="flex align-center mt-0 w-full">
                    <div class="flex flex-col flex-wrap align-center pt-0 w-full">
                        <div :class="{ 'd-block': selectedFamilyInitial, 'd-none': !selectedFamilyInitial }" class="mt-3 w-full">
                            <div class="flex align-center" no-gutters>
                                <div class="flex flex-col" no-gutters>
                                    <v-chip no-gutters
                                        v-for="(family, index) in families"
                                        :key="family"
                                        class="m-2"
                                        closable
                                        color="black"
                                        style="border-radius: 5px;"
                                        variant="flat"
                                        @click:close="toggleValueInArray(families, family)"
                                    >
                                        {{ family }}
                                    </v-chip>
                                </div>
                            </div>
                            <v-row class="letter-button border-brand" color="black" text no-gutters>
                                <v-col no-gutters 
                                    v-for="family in availableFamilies" 
                                    :key="family" 
                                    cols="12" sm="6" md="4" lg="3">
                                    <div
                                    :class="{ 'selected': families.includes(family) }" 
                                    class="m-3" 
                                    style="font-size: 16px;" 
                                    @click="toggleValueInArray(families, family)">
                                        {{ family }}
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </div>
        </GenericFilter>
    </div>
</template>