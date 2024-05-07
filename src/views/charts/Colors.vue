<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { ref, watch } from 'vue';
import GenericFilter from './filters/GenericFilter.vue';

defineExpose({
    resetFilter
})
const props = defineProps<{
    colorFamilies: any[]
}>()
const colors = defineModel<string[]>({ required: true })
const colorsList = ref<any[]>([])
const selectedColorFamilies = ref<string[]>([])

watch(selectedColorFamilies, async () => {
    try {
        const response = await axios.get('/filter/filter_charts_vehicles/color_name/', {
            params: {
                search: `colorfamily_name:${selectedColorFamilies.value.join("|")}`
            }
        });
        colorsList.value = response.data.items;
    } catch (error) {
        console.error('Errore nel recupero dei paesi:', error);
    }  
}, {
    deep: true
})

function resetFilter() {
    emptyArray(selectedColorFamilies.value)
    emptyArray(colors.value)
}

</script>

<template>
    <div>
        <GenericFilter filterName="Colors">
            <div class="flex flex-col">
                <div class="filters-grid-selection">
                    <v-btn
                        v-for="color in colorFamilies"
                        :key="color.colorfamily_name"
                        class="letter-button selection"
                        :variant="selectedColorFamilies.includes(color.colorfamily_name) ? 'elevated' : 'outlined'"
                        @click="toggleValueInArray(selectedColorFamilies, color.colorfamily_name)"
                        :color="selectedColorFamilies.includes(color.colorfamily_name) ? 'black' : ''"
                        style="min-width: 20px; margin: 2px; font-size: 10px;"
                    >
                        {{ color.colorfamily_name }}
                    </v-btn>
                </div>
                <v-row justify="start" class="align-center mt-3">
                    <v-col class="d-flex flex-wrap align-center pt-0">
                        <v-btn
                            v-for="color in colorsList" 
                            :key="color.color_name"
                            class="letter-button"
                            :variant="colors.includes(color.color_name) ? 'elevated' : 'outlined'"
                            @click="toggleValueInArray(colors, color.color_name)"
                            color="black"
                            text=""
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                            {{ color.color_name }}
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </GenericFilter>
    </div>
</template>
