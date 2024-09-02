<script setup lang="ts">
import { ref } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import { emptyArray } from '@/utils/functions/EmptyArray';

defineExpose({
    resetFilter
})

const months = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic"
];

const selectedMonths = defineModel<string[]>({ required: true })

function resetFilter() {
    emptyArray(selectedMonths.value)
}

</script>

<template>
    <GenericFilter filterName="Auction Month" light>
        <div class="grid gap-2 grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-7 lg:flex-wrap">
            <v-btn
                v-for="monthName in months"
                :key="monthName"
                class="letter-button selection lg:flex-1 rounded-sm"
                :variant="selectedMonths.includes(monthName) ? 'elevated' : 'outlined'"
                @click="toggleValueInArray(selectedMonths, monthName)"
                :color="selectedMonths.includes(monthName) ? 'black' : ''"
                style="min-width: 20px; margin: 2px; font-size: 10px;"
            >
                {{ monthName }}
            </v-btn>
        </div>
    </GenericFilter>
</template>