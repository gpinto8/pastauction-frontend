<script setup lang="ts" generic="T extends { [key: string]: { name: string, value: string }[] }">
import { defineModel } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue';

defineExpose({
    resetFilter,
    hasSomethingSelected
})

const props = defineProps<{
    filterName?: string,
    miscellaneousOptions: T
}>()

const selection = defineModel<{
    [K in keyof T]: string | null
}>({ required: true })

function toggleSelection(optionName: keyof T, value: string) {
    selection.value[optionName] = selection.value[optionName] == value ? null : value
}

function resetFilter() {
    for (let key in selection.value) selection.value[key] = null
}

function hasSomethingSelected() {
    for (const key in selection) {
        if (selection[key as keyof typeof selection] != null) return true
    }
    return false
}

</script>

<template>
    <GenericFilter :filterName="filterName || 'Miscellaneous'" light>
        <div class="flex flex-wrap flex-col sm:flex-row">
            <!-- @vue-ignore -->
            <div class="flex flex-wrap mb-4 sm:mb-0 sm:mr-4" v-for="(misc, optionName) of props.miscellaneousOptions">
                <!-- {{ optionName }} - {{ misc }} -->
                <v-btn v-for="option of misc" class="letter-button flex-1 sm:w-fit"
                    :variant="selection[optionName] === option.value ? 'elevated' : 'outlined'"
                    @click="toggleSelection(optionName, option.value)"
                    :color="selection[optionName] === option.value ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;">
                    {{ option.name }}
                </v-btn>
            </div>
        </div>
    </GenericFilter>
</template>