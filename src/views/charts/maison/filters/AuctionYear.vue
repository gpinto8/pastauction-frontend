<script setup lang="ts">
import { ref } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import { emptyArray } from '@/utils/functions/EmptyArray';

defineExpose({
    resetFilter
})

type TimeFrame = {
    startYear: number,
    endYear: number
}

const timeFrames: TimeFrame[] = [
    {
        startYear: 1960,
        endYear: 1969,
    },
    {
        startYear: 1970,
        endYear: 1979,
    },
    {
        startYear: 1980,
        endYear: 1989,
    },
    {
        startYear: 1990,
        endYear: 1999,
    },
    {
        startYear: 2000,
        endYear: 2009,
    },
    {
        startYear: 2010,
        endYear: 2019,
    },
    {
        startYear: 2020,
        endYear: 2029,
    },
]

const selectedTimeFrame = ref<TimeFrame | null>(null)
const selectedYears = defineModel<number[]>({ required: true })

function resetFilter() {
    selectedTimeFrame.value = null
    emptyArray(selectedYears.value)
}

</script>

<template>
    <GenericFilter filterName="Auction Year">
        <div class="flex flex-col">
            <div class="grid gap-2 grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-7 lg:flex-wrap">
                <button
                    v-for="timeFrame in timeFrames"
                    :key="timeFrame.startYear"
                    class="letter-button border h-8 !border-black selection !text-base lg:flex-1"
                    :class="JSON.stringify(selectedTimeFrame) == JSON.stringify(timeFrame) ? 'bg-black text-white' : 'outlined'"
                    @click="selectedTimeFrame = timeFrame"
                    :color="JSON.stringify(selectedTimeFrame) == JSON.stringify(timeFrame) ? 'black' : ''"
                    style="margin: 2px; border-radius: 2px"
                >
                    {{ timeFrame.startYear }} - {{ timeFrame.endYear }}
                </button>
            </div>
            <div class="flex flex-wrap mt-2">
                <v-chip
                    v-for="(maison) in selectedYears"
                    noGutters
                    :key="`${maison}-index`"
                    class="mr-2 mb-2"
                    closable
                    color="black"
                    style="border-radius: 5px;"
                    variant="flat"
                    :text="'' + maison"
                    @click:close="toggleValueInArray(selectedYears, maison)"
                >
            </v-chip>
            </div>
            <div v-if="selectedTimeFrame != null" class="grid gap-2 grid-cols-4
                        lg:flex lg:gap-0 lg:space-x-7 lg:flex-wrap">
                <button
                v-for="index of selectedTimeFrame.endYear - selectedTimeFrame.startYear + 1"
                :key="index"
                class="letter-button selection rounded-sm border !border-black !text-base lg:flex-1"
                :class="selectedYears.includes(selectedTimeFrame.startYear + index - 1) ? 'bg-black text-white' : ''"
                @click="toggleValueInArray(selectedYears, selectedTimeFrame.startYear + index - 1)"
                :color="selectedYears.includes(selectedTimeFrame.startYear + index - 1)?  'black' : ''"
                style="margin: 2px;">
                    {{ selectedTimeFrame.startYear + index - 1 }}
                </button>
            </div>
        </div>
    </GenericFilter>
</template>