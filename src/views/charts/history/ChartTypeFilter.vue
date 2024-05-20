<script setup lang="ts">
import { defineModel } from 'vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';

const props = defineProps<{
    availableChartTypes: string[]
}>()
const chartTypes = defineModel<string[]>({ required: true })

</script>

<template>
    <div class="flex [&>*]:shadow-[0px_3px_10px_0px_#00000040]">
        <div v-for="(chartType, index) of availableChartTypes" class="bg-grey-100 flex-1 flex-center text-white text-2xl py-2 transition-colors"
        :class="{
            'bg-black': chartTypes.includes(chartType)
        }" 
        @click="toggleValueInArray(chartTypes, chartType)"
        :style="`z-index: ${index};`"
        >
            {{ chartType }}
        </div>
    </div>
</template>
