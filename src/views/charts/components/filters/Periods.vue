<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import GenericFilter from '../../components/GenericFilter.vue'

defineExpose({
    resetFilter
})
const props = defineProps<{
    // periods: any[],
    filterName?: string
}>()
const selectedPeriods = defineModel<string[]>({ required: true })

const periods = {
    Anitique: { startYear: 1880, endYear: 1904, },
    Veteran: { startYear: 1905, endYear: 1918, },
    Vintage: { startYear: 1919, endYear: 1930, },
    'Post Vintage': { startYear: 1931, endYear: 1945, },
    Classic: { startYear: 1946, endYear: 1964, },
    'Posc Classic': { startYear: 1965, endYear: 1974, },
    Modern: { startYear: 1975, endYear: 1999, },
    Contemporary: { startYear: 2000, endYear: 2020, },
    'N/A': { startYear: 1974, endYear: 1904, },
}

function resetFilter() {
    emptyArray(selectedPeriods.value)
}

</script>

<template>
    <div>
        <GenericFilter :filterName="filterName || 'Periods'" justify="start" light>
            <div class="grid gap-2 grid-cols-2
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:flex lg:gap-0 lg:space-x-3">
                <button
                    v-for="(period, name) of periods"
                    :key="name"
                    class="capitalize selection !h-14 !text-[13px] text-left border !border-black p-2 grow shrink transition-colors"
                    :class="selectedPeriods.includes(name) ? 'bg-black text-white' : ''"
                    @click="toggleValueInArray(selectedPeriods, name)"
                    :color="selectedPeriods.includes(name) ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; font-family: sans-serif !important"
                >
                    <div class="flex flex-col">
                        <div>
                            {{ name }}
                        </div>
                        <div>
                            {{ name == 'N/A' ? 'none' : `${period.startYear}-${period.endYear}` }}
                        </div>
                    </div>
                </button>
            </div>
        </GenericFilter>
    </div>
</template>