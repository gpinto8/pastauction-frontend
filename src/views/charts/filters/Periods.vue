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
            <class class="flex flex-wrap align-center">
                <v-btn
                    v-for="period in periods"
                    :key="period.age_name"
                    class="letter-button"
                    :variant="selectedPeriods.includes(period.age_name) ? 'elevated' : 'outlined'"
                    @click="toggleValueInArray(selectedPeriods, period.age_name)"
                    :color="selectedPeriods.includes(period.age_name) ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ period.age_name }}
                </v-btn>
            </class>
        </GenericFilter>
    </div>
</template>