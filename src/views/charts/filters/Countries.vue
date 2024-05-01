<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';


const props = defineProps<{
    continents: any[]
}>()
let selectedContinents = ref<null | string>(null)

let countriesOfContinent = ref<any[]>([])

async function selectCountry(country: string) {
    selectedContinents.value = country;
    // countrySelected = true;
}

// Refresh the countries displayed when changing the selected continent
watch(selectedContinents, async () => {

    try {
        const response = await axios.get('/filter/filter_charts_vehicles/country_brand_name/', {
            params: {
                search: `country_brand_area:${selectedContinents.value}`
            }
        });
        countriesOfContinent.value = response.data.items;
    } catch (error) {
        console.error('Errore nel recupero dei paesi:', error);
    }

})

let selectedCountry = ref<any[]>([])

function getImageUrl(countryFlag: string) {
    const brandAbbreviation = countryFlag.substring(0, 3).toUpperCase();
    return `https://past-auction-p.s3.amazonaws.com/LogoCountry/${brandAbbreviation}.jpeg`;
}

</script>

<template>
    <div>
        <v-row justify="start">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="flat"
                    label
                    size="large"
                >
                    <small>Countries</small>
                </v-chip>
                <v-btn
                    v-for="country in props.continents"
                    :key="country.country_brand_area"
                    class="letter-button"
                    :variant="selectedContinents === country.country_brand_area ? 'elevated' : 'outlined'"
                    @click="selectCountry(country.country_brand_area)"
                    color="black"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ country.country_brand_area }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="start" class="align-center mt-0">
            <v-col class="d-flex flex-wrap align-center pt-0">
                <div :class="{ 'd-block': selectedContinents, 'd-none': !selectedContinents }" class="mt-3">
                    <v-row justify="start" class="align-center">
                        <v-col>
                            <v-chip
                                v-for="(countryName, index) in selectedCountry"
                                :key="index"
                                class="m-2"
                                closable
                                color="black"
                                style="border-radius: 5px;"
                                variant="flat"
                                @click:close="toggleValueInArray(selectedCountry, countryName)"
                            >
                                {{ countryName }}
                            </v-chip>
                        </v-col>
                    </v-row>
                    <v-row class="letter-button border-brand" color="black" text>
                        <v-col 
                            v-for="flag in countriesOfContinent" 
                            :key="flag" 
                            cols="12" sm="2" md="2" lg="2"
                            class="flex-center object-cover"
                            >
                                <div 
                                :class="selectedCountry.includes(flag.country_brand_name) == true ? 'border-blue-400' : 'border-transparent'" 
                                class="m-3 w-14 h-9 border-2" 
                                style="font-size: 16px;" 
                                @click="toggleValueInArray(selectedCountry, flag)">
                                    <v-img :src="getImageUrl(flag.country_brand_name)" cover class="w-full h-full"/>
                                </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>