<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import GenericFilter from './GenericFilter.vue';

defineExpose({
    resetFilter
})
const props = defineProps<{
    periods: any[]
}>()
const selectedPeriods = defineModel<string[]>({ required: true })

function resetFilter() {
    emptyArray(selectedPeriods.value)
}

</script>

<template>
    <div>
        <GenericFilter filterName="Periods" justify="start" light>
            <div class="grid gap-2 grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-3 lg:flex-wrap">
                <v-btn
                    v-for="period in periods"
                    :key="period.age_name"
                    class="letter-button selection"
                    :variant="selectedPeriods.includes(period.age_name) ? 'elevated' : 'outlined'"
                    @click="toggleValueInArray(selectedPeriods, period.age_name)"
                    :color="selectedPeriods.includes(period.age_name) ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; font-size: 10px;"
                >
                    {{ period.age_name }}
                </v-btn>
            </div>
        </GenericFilter>
    </div>
</template>