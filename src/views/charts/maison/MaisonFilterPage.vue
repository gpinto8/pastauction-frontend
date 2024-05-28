<script setup lang="ts">
import { sendFilterRequest } from '@/api/filter/filterApi';
import { vehiclesCountryBrandArea } from '@/api/filter/vehicles/vehicles';
import { useChartsStore } from '@/store/charts/charts';
import { computed, reactive, ref } from 'vue';
import Periods from '../components/filters/Periods.vue';
import Countries from '../vehicle/filters/Countries.vue';
import AuctionCity from './filters/AuctionCity.vue';
import AuctionYear from './filters/AuctionYear.vue';
import Maison from './filters/Maison.vue';
import Miscellaneous from './filters/Miscellaneous.vue';
import Month from './filters/Month.vue';
import axios from 'axios';

const chartStore = useChartsStore()

const loading = ref<boolean>(true)

const selectedMaisonNames = ref<string[]>([])
const maisonNamesFilter = ref<HTMLInputElement | null>(null)

const cityFilter = ref<HTMLInputElement | null>(null)
const selectedCityNames = ref<string[]>([])

const continents = ref<string[]>([])
const maisonCountriesFilter = ref<HTMLInputElement | null>(null)
const maisonCountries = ref<string[]>([])

const auctionCountriesFilter = ref<HTMLInputElement | null>(null)
const auctionCountries = ref<string[]>([])

const periodsFilter = ref<HTMLInputElement | null>(null)
const selectedPeriods = ref<string[]>([])
const periods = ref<string[]>([])

const auctioYearFilter = ref<HTMLInputElement | null>(null)
const selectedYears = ref<number[]>([])

const monthFilter = ref<HTMLInputElement | null>(null)
const selectedMonths = ref<string[]>([])

const miscFilter = ref<HTMLInputElement | null>(null)
const miscOptions = reactive({
    soldStatus: null,
    quotedStats: null,
    chassisStatus: null,
    currency: null,
})

async function fetchPeriods() {
    const response = await sendFilterRequest('bidwatcher_age', 'name')
    periods.value = response.data.items.map((el: any) => ({ age_name: el.name }))
}

async function fetchContinents() {
    const response = await vehiclesCountryBrandArea()
    continents.value = response.data.items
}

Promise.all([fetchPeriods(), fetchContinents()])
    .finally(() => {
        loading.value = false
    })

function clearFilters() {
    (maisonNamesFilter.value as any).resetFilter();
    (auctioYearFilter.value as any).resetFilter();
    (monthFilter.value as any).resetFilter();
    (cityFilter.value as any).resetFilter();
    (periodsFilter.value as any).resetFilter();
    (miscFilter.value as any).resetFilter();
    (maisonCountriesFilter.value as any).resetFilter();
    (auctionCountriesFilter.value as any).resetFilter();
}

async function previewDataset() {
    // Use /bidwatcher_auction/query_1 to get the preview data
    console.log('preview data');

    // this.isLoadingPreviewData = true
    let searchParams = [
        getBrandsSearchParams(this.selectedBrands),
        getFamilySearchParams(this.selectedFamilies),
        getModelSearchParams(this.selectedModelFull),
        getCountriesSearchParams(this.selectedCountries),
        getTypesSearchParams(this.types),
        getAttributesSearchParams(this.selectedAttributes),
        getPeriodsSearchParams(this.selectedPeriods),
        getColorsSearchParams(this.selectedColors),
        getMiscSearchParams(),
    ]

    this.$nextTick(() => {
        (this.$refs.previewdata as any).scrollIntoView({ behavior: 'smooth' })
    })

    // Filter empty params
    searchParams = searchParams.filter(param => param != '')
    console.log(searchParams.join(','));

    try {
        const response = await axios.get(`/bidwatcher_vehicle/query_0`, {
            params: {
                search: searchParams.join(','),
            }
        });
        // const response = await axios.get(`/bidwatcher_vehicle/query_v?search=brand_name%3AAbarth%2Cage_name%3AModern&page=1&size=50`);
        this.isLoadingPreviewData = false
        console.log(response);
        this.previewData = response.data.items[0];
        this.$nextTick(() => {
            (this.$refs.previewdata as any).scrollIntoView({ behavior: 'smooth' })
        })
    } catch (error) {
        this.isLoadingPreviewData = false
        console.error('Preview dataset error:', error);
    }

}

const isSelectedMaisonNames = computed(() => selectedMaisonNames.value.length > 0)
const isSelectedCityNames = computed(() => selectedCityNames.value.length > 0)
const isMaisonCountries = computed(() => maisonCountries.value.length > 0)
const isAuctionCountries = computed(() => auctionCountries.value.length > 0)
const isSelectedPeriods = computed(() => selectedPeriods.value.length > 0)
const isSelectedYears = computed(() => selectedYears.value.length > 0)
const isSelectedMonths = computed(() => selectedMonths.value.length > 0)
const isMiscOptions = computed(() => {
    for (const key in miscOptions) {
        if (miscOptions[key as keyof typeof miscOptions] != null) return true
    }
    return false
})

const canPreviewData = computed(() => {
    return [
        isSelectedMaisonNames.value,
        isSelectedCityNames.value,
        isMaisonCountries.value,
        isAuctionCountries.value,
        isSelectedPeriods.value,
        isSelectedYears.value,
        isSelectedMonths.value,
        isMiscOptions.value
    ].filter(criteria => criteria == true).length >= 3
})

</script>

<template>
    <div class="flex flex-col px-8">
        <v-alert color="info" variant="tonal">
            <v-row justify="center">
                <v-col cols="12">
                    <div class="text-center text-black">
                        <h3><strong>{{ chartStore.selectedChartCategory }} Filter</strong></h3>
                    </div>
                </v-col>
            </v-row>
        </v-alert>
        <v-row justify="start" class="mt-2 mb-4">
            <v-col>
                <small>Please, select almost 3 parameters</small>
            </v-col>
            <v-col>
                <v-btn size="x-small" class="float-right" color="black" @click="clearFilters()">Clear filters</v-btn>
            </v-col>
        </v-row>
        <v-container fluid v-if="loading">
            <div class="m-5 d-flex align-center justify-center">
                <v-progress-circular v-if="loading" :size="70" :width="7" color="primary"
                    indeterminate></v-progress-circular>
            </div>
        </v-container>
        <div class="flex flex-col space-y-7" v-else>
            <Maison v-model="selectedMaisonNames" ref="maisonNamesFilter" />
            <Countries filterName="Maison Countries" :continents="continents" v-model:countries="maisonCountries"
                ref="maisonCountriesFilter" />
            <Countries filterName="Auction Countries" :continents="continents" v-model:countries="auctionCountries"
                ref="auctionCountriesFilter" />
            <AuctionCity v-model="selectedCityNames" ref="cityFilter" />
            <AuctionYear v-model="selectedYears" ref="auctioYearFilter" />
            <Month v-model="selectedMonths" ref="monthFilter" />
            <Periods :periods="periods" v-model="selectedPeriods" filterName="Vehicle periods" ref="periodsFilter" />
            <Miscellaneous v-model="miscOptions" ref="miscFilter" :miscellaneousOptions="{
                soldStatus: [{
                    name: 'Sold',
                    value: 'sold'
                },
                {
                    name: 'Not sold',
                    value: 'not sold'
                }
                ],
                quotedStats: [{
                    name: 'Quoted',
                    value: 'quoted'
                },
                {
                    name: 'Not quoted',
                    value: 'not quoted'
                }
                ],
                chassisStatus: [{
                    name: 'With Chassis',
                    value: 'with chassis'
                },
                {
                    name: 'Without Chassis',
                    value: 'without chassis'
                }
                ],
                currency: [
                    { name: 'AUD', value: 'aud' },
                    { name: 'CAD', value: 'cad' },
                    { name: 'CHF', value: 'chf' },
                    { name: 'DKK', value: 'dkk' },
                    { name: 'EAD', value: 'ead' },
                    { name: 'GBP', value: 'gbp' },
                    { name: 'JPY', value: 'jpy' },
                    { name: 'PLN', value: 'pln' },
                    { name: 'RNB', value: 'rnb' },
                    { name: 'RUB', value: 'rub' },
                    { name: 'SEK', value: 'sek' },
                    { name: 'USD', value: 'usd' },
                ]
            }" />
        </div>
        <div class="flex flex-col space-y-2 mt-5 
                    sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2">
            <v-btn size="default" height="40" class="rounded-md" color="black" @click="previewDataset()"
                :disabled="!canPreviewData">Preview data set</v-btn>
        </div>
    </div>
</template>

<style>
.letter-button {
    text-transform: capitalize;
    font-size: 15px !important;
}

.option {
    @apply rounded-[2.8px]
}

.custom-chip {
    @apply w-full bg-blue-500 rounded-[2.5px] flex justify-center items-center text-white
}

.custom-light-chip {
    @apply bg-white text-blue-500 border border-blue-500
}

@media screen(sm) {
    .custom-chip {
        @apply w-32
    }

    .selection {
        @apply rounded-sm
    }
}

.filters-grid-selection {
    @apply grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:gap-0 lg:space-x-3 lg:[&>*]:flex-1
}

.selected {
    text-decoration: underline;
    color: #407BFF;
}

.border-brand {
    min-width: 20px;
    margin: 2px;
    border: 1px solid black;
    font-size: 10px;
}

.category-link {
    display: block;
    position: relative;
    padding-left: 10px;
    /* Spazio a sinistra della linea */
}
</style>