<script setup lang="ts">
import { requestChartsSelection } from '@/api/charts/charts';
import { ref } from 'vue';
import ChartTypeFilter from './ChartTypeFilter.vue'

const charTypes = ref<string[]>([])
requestChartsSelection()
    .then(response => {
        console.log(response.data.items);
        charTypes.value = response.data.items.map((el: any) => el.title)
    })

const selectedChartTypes = ref<string[]>([])

</script>

<template>
    <div class="flex flex-col px-10">
        <div class="flex-center bg-grey-100 p-5 rounded-[5px] text-xl font-semibold">
            My Charts
        </div>

        <div class="my-7 text-">
            Here you can see all your purchased charts
        </div>

        <ChartTypeFilter class="w-full" :availableChartTypes="charTypes" v-model="selectedChartTypes"/>

    </div>
</template>