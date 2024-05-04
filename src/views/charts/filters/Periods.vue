<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';

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
        <v-row justify="start">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="outlined"
                    label
                    size="large"
                >
                    <small>Periods</small>
                </v-chip>
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
            </v-col>
        </v-row>
    </div>
</template>