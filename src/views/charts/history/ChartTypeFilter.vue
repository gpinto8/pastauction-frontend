<script setup lang="ts">
import { defineModel } from 'vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';

const props = defineProps<{
    availableChartTypes: string[],
}>()
const chartTypes = defineModel<string[]>({ required: true })

</script>

<template>
    <div class="flex [&>*]:shadow-[0px_3px_10px_0px_#00000040]">
        <button v-for="(chartType, index) of availableChartTypes" class="flex-1 flex-center text-white text-2xl py-2 transition-colors"
        :class="chartTypes.includes(chartType) ? (index < 3 ? 'bg-blue-500' : 'bg-orange-500') : 'bg-[#CECECE]' " 
        @click="toggleValueInArray(chartTypes, chartType)"
        :style="`z-index: ${index};`"
        >
            {{ chartType }}{{ index < 3 }}
        </button>
    </div>
</template>
