<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import GenericFilter from '../../components/GenericFilter.vue';

defineExpose({
    resetFilter
})
const countries = defineModel<string[]>({ required: true })
const props = defineProps<{
    continents: any[],
    filterName?: string
}>()
let selectedContinent = defineModel<null | string>('selectedContinent', { required: true })
let countriesOfContinent = defineModel<any[]>('countriesOfContinent', { required: true })

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
        <GenericFilter :filterName="filterName || 'Countries'" class="flex">
            <div class="flex flex-col">
                <div class="filters-grid-selection">
                    <v-btn
                        v-for="country in props.continents"
                        :key="country.country_brand_area"
                        class="letter-button selection"
                        :variant="selectedContinent === country.country_brand_area ? 'elevated' : 'outlined'"
                        @click="selectedContinent = country.country_brand_area"
                        color="black"
                        style="min-width: 20px; margin: 2px; font-size: 10px;"
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
                                    class="m-2 "
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
                            <div
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
                            </div>
                        </v-row>
                    </div>
                </div>
            </div>
        </GenericFilter>
    </div>
</template>