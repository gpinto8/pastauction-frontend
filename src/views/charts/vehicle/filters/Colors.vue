<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue'


defineExpose({
    resetFilter
})
const props = defineProps<{
    colorFamilies: any[]
}>()
const colors = defineModel<string[]>({ required: true })
const colorsList = computed(() => {
    return availableColors.filter(color => selectedColorFamilies.value.includes(color.name))
        .flatMap(colorFamily => colorFamily.shades)
})
const selectedColorFamilies = ref<string[]>([])

const availableColors = [
    {
        name: "White",
        hex: "#FFFFFF",
        code: 10,
        shades: [
            { name: "Ivory", hex: "#FDF5E6", code: 15 }
        ]
    },
    {
        name: "Grey",
        hex: "#808080",
        code: 20,
        shades: [
            { name: "Silver", hex: "#DCDCDC", code: 20 },
            { name: "Champagne", hex: "#FFFACD", code: 21 },
            { name: "Grey", hex: "#808080", code: 25 }
        ]
    },
    {
        name: "Yellow",
        hex: "#FFFF00",
        code: 40,
        shades: [
            { name: "Yellow", hex: "#FFFF00", code: 40 },
            { name: "Gold", hex: "#DAA520", code: 45 }
        ]
    },
    {
        name: "Red",
        hex: "#FF0000",
        code: 50,
        shades: [
            { name: "Pink", hex: "#FFB6C1", code: 50 },
            { name: "Peach", hex: "#FFDAB9", code: 52 },
            { name: "Coral", hex: "#FF7F50", code: 54 },
            { name: "Red", hex: "#FF0000", code: 55 },
            { name: "Bordeaux", hex: "#800020", code: 56 },
            { name: "Ocher", hex: "#C71585", code: 57 },
            { name: "Orange", hex: "#FFA500", code: 58 }
        ]
    },
    {
        name: "Brown",
        hex: "#A0522D",
        code: 60,
        shades: [
            { name: "Bronze", hex: "#D2691E", code: 60 },
            { name: "Brown", hex: "#A0522D", code: 65 }
        ]
    },
    {
        name: "Green",
        hex: "#008000",
        code: 70,
        shades: [
            { name: "Green", hex: "#008000", code: 70 },
            { name: "Lightgreen", hex: "#7CFC00", code: 71 },
            { name: "Aquamarine", hex: "#7FFFD4", code: 73 },
            { name: "Turquoise", hex: "#40E0D0", code: 74 }
        ]
    },
    {
        name: "Blue",
        hex: "#0000FF",
        code: 80,
        shades: [
            { name: "Blue", hex: "#0000FF", code: 80 },
            { name: "Azure", hex: "#ADD8E6", code: 82 },
            { name: "Midnightblue", hex: "#191970", code: 83 }
        ]
    },
    {
        name: "Black",
        hex: "#000000",
        code: 90,
        shades: [
            { name: "Anthracite", hex: "#708090", code: 90 },
            { name: "Black", hex: "#000000", code: 99 }
        ]
    }
];

function getColorsOfFamily(familyName: string) {
    return availableColors.find(el => el.name == familyName)?.shades
}

function hexFromName(colorName: string) {
    return colorsList.value.find(el => el.name == colorName)?.hex || 'black'
}

// watch(selectedColorFamilies, async () => {
//     try {
//         const response = await axios.get('/filter/filter_charts_vehicles/color_name/', {
//             params: {
//                 search: `colorfamily_name:${selectedColorFamilies.value.join("|")}`
//             }
//         });
//         colorsList.value = response.data.items;
//     } catch (error) {
//         console.error('Errore nel recupero dei paesi:', error);
//     }  
// }, {
//     deep: true
// })

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
                    <!-- :variant="selectedColorFamilies.includes(color.name) ? 'elevated' : 'outlined'" -->
                    <!-- :color="selectedColorFamilies.includes(color.name) ? 'black' : ''" -->
                    <v-btn v-for="color in availableColors" :key="color.code" class="letter-button selection"
                        variant="outlined"
                        @click="toggleValueInArray(selectedColorFamilies, color.name)"
                        style="min-width: 20px; margin: 2px;"
                        :style="{
                            backgroundColor: selectedColorFamilies.includes(color.name) ? `${color.hex}` : 'transparent'
                        }">
                        {{ color.name }}
                    </v-btn>
                </div>
                <div class="flex flex-wrap my-3" noGutters>
                    <v-chip noGutters v-for="color in colors" :key="`${color}-index`" 
                        class="mr-2 mb-2 mix-blend-screen" closable
                        style="border-radius: 5px;" variant="flat" :text="color"
                        :style="{
                            'background-color': hexFromName(color),
                            backgroundBlendMode: 'difference'
                        }"
                        @click:close="toggleValueInArray(colors, color)">
                    </v-chip>
                    
                </div>
                <v-row justify="start" class="align-center">
                    <v-col class="d-flex flex-wrap align-center pt-0">
                        <div class="flex flex-col">
                            <div v-for="family in selectedColorFamilies" 
                                class=" grid grid-cols-2 
                                        sm:grid-cols-3 
                                        md:grid-cols-4
                                        lg:grid-cols-8">
                                    <v-btn v-for="color in getColorsOfFamily(family)" :key="color.code"
                                        class="letter-button"
                                        :variant="colors.includes(color.name) ? 'outlined' : 'text'"
                                    @click="toggleValueInArray(colors, color.name)" color="black"
                                    style="min-width: 20px; margin: 2px; border-radius: 0px;" :style="{
                                        backgroundColor: color.hex
                                    }">
                                    {{ color.name }}
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </GenericFilter>
    </div>
</template>

<style scoped>
.letter-button{
    font-size: 15px
}
</style>