<script setup lang="ts" generic="T extends { [key: string]: { name: string, value: string }[] }">
import GenericFilter from '../../components/GenericFilter.vue';
import { reactive, defineModel } from 'vue';

const props = defineProps<{
    filterName?: string,
    miscellaneousOptions: T
}>()

const selection = defineModel<{
    [keyof in T]: string
}>({ required: true })

function toggleSelection(optionName: string, value: string) {
    selection.value[optionName] = selection.value[optionName] == value ? selection.value = null : selection.value = value
}

</script>

<template>
    <GenericFilter :filterName="filterName || 'Miscellaneous'">
        <div class="flex flex-wrap flex-col sm:flex-row space-y-4 sm:space-y-0">
            <div class="flex flex-wrap space-x-4 mr-4" v-for="(misc, optionName) of miscellaneousOptions">
                <v-btn
                    v-for="option of misc"
                    class="letter-button flex-1 sm:w-fit"
                    :variant="selection[optionName] === option.value ? 'elevated' : 'outlined'"
                    @click="toggleSelection(optionName, option.value)"
                    :color="selection[optionName] === option.value ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ option.name }}
                </v-btn>
            </div>
        </div>
    </GenericFilter>
</template>