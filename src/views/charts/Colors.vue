<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { ref, watch } from 'vue';

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

</script>

<template>
    <div>
        <v-row justify="start">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="flat"
                    label
                    size="large"
                >
                    <small>Colours</small>
                </v-chip>
                <v-btn
                    v-for="color in colorFamilies"
                    :key="color.colorfamily_name"
                    class="letter-button"
                    :variant="selectedColorFamilies.includes(color.colorfamily_name) ? 'elevated' : 'outlined'"
                    @click="toggleValueInArray(selectedColorFamilies, color.colorfamily_name)"
                    :color="selectedColorFamilies.includes(color.colorfamily_name) ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ color.colorfamily_name }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="start" class="align-center mt-0">
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
</template>
