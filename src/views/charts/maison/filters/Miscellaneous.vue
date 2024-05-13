<script setup lang="ts" generic="T extends { [key: string]: { name: string, value: string }[] }">
import GenericFilter from '../../components/GenericFilter.vue';
import { reactive } from 'vue';

const props = defineProps<{
    filterName?: string,
    miscellaneousOptions: T
}>()

const selection = defineModel<{
    [keyof in T]: string
}>({ required: true })

</script>

<template>
    <GenericFilter :filterName="filterName || 'Miscellaneous'">
        <div class="flex flex-wrap">
            <div class="flex space-x-4 mr-4" v-for="(misc, key) of miscellaneousOptions">
                <v-btn
                    v-for="option of misc"
                    class="letter-button"
                    :variant="selection[key] === option.value ? 'elevated' : 'outlined'"
                    @click="selection[key] = option.value"
                    :color="selection[key] === option.value ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ option.name }}
                </v-btn>
            </div>
        </div>
    </GenericFilter>
</template>