<script setup lang="ts">
import { requestChartsSelection } from '@/api/charts/charts';
import { ref } from 'vue';
import type { ChartCategory } from '../chart';
import ChartCategoryFilter from './ChartCategory.vue';
import ChartTypeFilter from './ChartTypeFilter.vue';
import YearSelector from './YearSelector.vue';
import HistoryElement from './HistoryElement.vue';

const charTypes = ref<string[]>([])
requestChartsSelection()
    .then(response => {
        console.log(response.data.items);
        charTypes.value = response.data.items.map((el: any) => el.title)
    })

const selectedChartTypes = ref<string[]>([])
const year = ref<number>(new Date().getFullYear())
const chartCategory = ref<ChartCategory | null>(null)
const filterActiveCharts = ref<boolean | null>(null)
</script>

<template>
    <div class="flex flex-col px-10">
        <div class="flex-center bg-grey-100 p-5 rounded-[5px] text-xl font-semibold">
            My Charts
        </div>

        <div class="my-7 text-">
            Here you can see all your purchased charts
        </div>

        <ChartTypeFilter class="w-full mb-5" :availableChartTypes="charTypes" v-model="selectedChartTypes"/>

        <div class="flex items-center justify-between w-full ">
            <ChartCategoryFilter v-model="chartCategory"/>
            <YearSelector v-model="year"/>
            <select class="w-64 h-8 px-4 border border-black rounded-md"
            v-model="filterActiveCharts"
            placeholder="Select value">
                <option disabled selected value class="text-white"> Select value </option>
                <option :value="false">Incative Charts</option>
                <option :value="true">Avtice Charts</option>
            </select>
        </div>

        <div class="space-y-10 py-10">
            <HistoryElement v-for="i in 10"/>
        </div>
    </div>
</template>