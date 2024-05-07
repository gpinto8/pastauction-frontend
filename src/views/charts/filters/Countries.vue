<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import { emptyArray } from '@/utils/functions/EmptyArray';
import GenericFilter from './GenericFilter.vue';

defineExpose({
    resetFilter
})
const countries = defineModel<string[]>('countries', { required: true })
const props = defineProps<{
    continents: any[]
}>()
let selectedContinent = ref<null | string>(null)

let countriesOfContinent = ref<any[]>([])

// Refresh the countries displayed when changing the selected continent
watch(selectedContinent, async () => {

    try {
        const response = await axios.get('/filter/filter_charts_vehicles/country_brand_name/', {
            params: {
                search: `country_brand_area:${selectedContinent.value}`
            }
        });
        countriesOfContinent.value = response.data.items;
    } catch (error) {
        console.error('Errore nel recupero dei paesi:', error);
    }

})

function getImageUrl(countryFlag: string) {
    const brandAbbreviation = countryFlag.substring(0, 3).toUpperCase();
    return `https://past-auction-p.s3.amazonaws.com/LogoCountry/${brandAbbreviation}.jpeg`;
}

function resetFilter() {
    selectedContinent.value = null
    emptyArray(countries.value)
}

</script>

<template>
    <div>
        <GenericFilter filterName="Countries" class="flex">
            <div class="flex flex-col">
                <div>
                    <v-btn
                        v-for="country in props.continents"
                        :key="country.country_brand_area"
                        class="letter-button"
                        :variant="selectedContinent === country.country_brand_area ? 'elevated' : 'outlined'"
                        @click="selectedContinent =  country.country_brand_area"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ country.country_brand_area }}
                    </v-btn>
                </div>
                <div class="flex align-center mt-0">
                    <div v-if="countriesOfContinent.length > 0" class="flex flex-col mt-3">
                        <v-row justify="start" class="align-center">
                            <v-col>
                                <v-chip
                                    v-for="(countryName, index) in countries"
                                    :key="index"
                                    class="m-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    @click:close="toggleValueInArray(countries, countryName)"
                                >
                                    {{ countryName }}
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row class="letter-button border-brand" color="black" text>
                            <class
                                v-for="flag in countriesOfContinent" 
                                :key="flag" 
                                class="flex-center object-cover grid"
                                >
                                    <div 
                                    :class="countries.includes(flag.country_brand_name) == true ? 'border-blue-400' : 'border-transparent'" 
                                    class="m-3 w-14 h-9 border-2" 
                                    style="font-size: 16px;" 
                                    @click="toggleValueInArray(countries, flag.country_brand_name)">
                                        <v-img :src="getImageUrl(flag.country_brand_name)" cover class="w-full h-full"/>
                                    </div>
                            </class>
                        </v-row>
                    </div>
                </div>
            </div>
        </GenericFilter>
    </div>
</template>