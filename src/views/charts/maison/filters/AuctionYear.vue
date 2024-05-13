<script setup lang="ts">
import { ref, watch } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';

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
const selectedYears = ref<number[]>([])

</script>

<template>
    <GenericFilter filterName="Auction Year">
        <div class="flex flex-col">
            <div class="grid gap-2 grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-7 lg:flex-wrap">
                <v-btn
                    v-for="timeFrame in timeFrames"
                    :key="timeFrame.startYear"
                    class="letter-button selection lg:flex-1"
                    :variant="JSON.stringify(selectedTimeFrame) == JSON.stringify(timeFrame) ? 'elevated' : 'outlined'"
                    @click="selectedTimeFrame = timeFrame"
                    :color="JSON.stringify(selectedTimeFrame) == JSON.stringify(timeFrame) ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; font-size: 10px;"
                >
                    {{ timeFrame.startYear }} - {{ timeFrame.endYear }}
                </v-btn>
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
            <div v-if="selectedTimeFrame != null" class="grid gap-2 grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-7 lg:flex-wrap lg:bg-red-300">
                <v-btn
                v-for="index of selectedTimeFrame.endYear - selectedTimeFrame.startYear + 1"
                :key="index"
                class="letter-button selection lg:flex-1"
                :variant="selectedYears.includes(selectedTimeFrame.startYear + index - 1) ? 'elevated' : 'outlined'"
                @click="toggleValueInArray(selectedYears, selectedTimeFrame.startYear + index - 1)"
                :color="selectedYears.includes(selectedTimeFrame.startYear + index - 1)?  'black' : ''"
                style="min-width: 20px; margin: 2px; font-size: 10px;">
                    {{ selectedTimeFrame.startYear + index - 1 }}
                </v-btn>
            </div>
        </div>
    </GenericFilter>
</template>