<script setup lang="ts">
import { ref, reactive } from 'vue';
import Maison from './filters/Maison.vue'
import AuctionCity from './filters/AuctionCity.vue';
import Periods from '../components/filters/Periods.vue';
import { sendFilterRequest } from '@/api/filter/filterApi';
import AuctionYear from './filters/AuctionYear.vue';
import Month from './filters/Month.vue';
import Miscellaneous from './filters/Miscellaneous.vue';
import { useChartsStore } from '@/store/charts/charts';

const chartStore = useChartsStore()

const loading = ref<boolean>(false)

const selectedMaisonNames = ref<string[]>([])
const selectedCityNames = ref<string[]>([])

const selectedPeriods = ref<string[]>([])
const periods = ref<string[]>([])

const auctioYearFilter = ref(null)
const selectedYears = ref<number[]>([])

const selectedMonths = ref<string[]>([])

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

Promise.all([fetchPeriods()])
.finally(() => {
    loading.value = false
})

function clearFilters() {
    (auctioYearFilter.value as any).resetFilter();
}

</script>

<template>
    <div class="flex flex-col">
        <v-alert color="info" variant="tonal">
            <v-row justify="center">
                <v-col cols="12">
                    <div class="text-center text-black">
                        <h3><strong>{{ chartStore.selectedChartCategory }} Filter</strong></h3>
                    </div>
                </v-col>
            </v-row>
        </v-alert>
        <v-row justify="start" class="mt-2">
            <v-col>
                <small>Please, select almost 3 parameters</small>
            </v-col>
            <v-col>
                <v-btn size="x-small" class="float-right" color="black" @click="clearFilters()">Clear filters</v-btn>
            </v-col>
        </v-row>
        <v-container fluid v-if="loading">
            <div class="m-5 d-flex align-center justify-center">
                <v-progress-circular
                    v-if="loading"
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </div>
        </v-container>
        <div class="flex flex-col space-y-7" v-else>
            <Maison v-model="selectedMaisonNames"/>
            <AuctionCity v-model="selectedCityNames"/>
            <AuctionYear v-model="selectedYears" ref="auctioYearFilter"/>
            <Month v-model="selectedMonths"/>
            <Periods :periods="periods" v-model="selectedPeriods" filterName="Vehicle periods"/>
            <Miscellaneous :miscellaneousOptions="{
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
            }"
            v-model="miscOptions"/>
        </div>
    </div>
</template>

<style>

.letter-button{
    text-transform: capitalize;
    font-size: 15px !important;
}

.custom-chip {
  @apply w-full bg-blue-500 rounded-md flex justify-center items-center text-white
}

.custom-light-chip{
    @apply bg-white text-blue-500 border border-blue-500
}

.selection {
    @apply rounded-md 
}

@media screen(sm) {
    .custom-chip{
        @apply w-32
    }
    
    .selection {
        @apply rounded-sm 
    }
}


.filters-grid-selection{
    @apply  grid gap-2 grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:flex lg:gap-0 lg:space-x-3 lg:[&>*]:flex-1
}

.selected{
    text-decoration: underline;
    color: #407BFF;
}

.border-brand{
    min-width: 20px; 
    margin: 2px; 
    border: 1px solid black; 
    font-size: 10px;
}
.category-link {
    display: block;
    position: relative;
    padding-left: 10px; /* Spazio a sinistra della linea */
}
</style>