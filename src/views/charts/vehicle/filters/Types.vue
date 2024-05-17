<script setup lang="ts">
import { emptyArray } from '@/utils/functions/EmptyArray';
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { defineModel, reactive, ref, watch } from 'vue';
import GenericFilter from '../../components/GenericFilter.vue'
import { bodyShapeOfCategoryType, categoryOfFamilyType } from '@/api/filter/vehicles/vehicles';
import { emptyReactiveObject } from '@/utils/functions/emptyReactiveObject';

defineExpose({
    resetFilter
})
const props = defineProps<{
    familiesOfTypes: any[]
}>()
const types = defineModel<string[]>({ required: true })

const selectedFamilyName = defineModel<string | null>('selectedFamily', { required: true })
const categoriesOfSelectedFamily = ref<any[]>([])

const bodyShapesByCategory = reactive<{ [key in string]: string[]}>({})
const cacheBodyShapesByCategory = reactive<{ [key in string]: { [key in string]: string[]}}>({})
const loadingBodyShapes = ref(false)

watch(selectedFamilyName, async () => {
    if (selectedFamilyName.value == null) return

    emptyReactiveObject(bodyShapesByCategory)

    // Don't request already request bodyshapes
    if (cacheBodyShapesByCategory[selectedFamilyName.value] != null) {
        Object.assign(bodyShapesByCategory, cacheBodyShapesByCategory[selectedFamilyName.value])
        return
    }

    loadingBodyShapes.value = true
    // Find categories given the selected family name
    let categoriesOfFamily = (await categoryOfFamilyType(selectedFamilyName.value)).data.items.map((el: any) => el.body_category)
    // Retrieve for each category its own list of body shapes
    let results = (await Promise.all(categoriesOfFamily.map((categoryName: any) => {
        return bodyShapeOfCategoryType(categoryName)
    })))
    .map((response: any) => response.data.items)
    .map((bodyShapes: any) => bodyShapes.map((bodyShape: any) => bodyShape.body_shape) )

    for(let i = 0; i < categoriesOfFamily.length; i++) {
        let categoryName = categoriesOfFamily[i]
        bodyShapesByCategory[categoryName] = results[i]
    }

    loadingBodyShapes.value = false
    
    // Cache the result
    if (cacheBodyShapesByCategory[selectedFamilyName.value] == null) 
        cacheBodyShapesByCategory[selectedFamilyName.value] = {}
    Object.assign(cacheBodyShapesByCategory[selectedFamilyName.value], bodyShapesByCategory)
})

const selectedCategoryName = defineModel<string | null>('selectedCategory', { required: true })

function resetFilter() {
    selectedFamilyName.value = null
    selectedCategoryName.value = null
    emptyArray(types.value)
}
</script>

<template>
    <div class="flex flex-col">
        <GenericFilter filterName="Types">
            <div class="flex flex-col">
                <div class="filters-grid-selection">
                    <v-btn
                        v-for="type in familiesOfTypes"
                        :key="type.body_type"
                        class="letter-button selection"
                        :variant="selectedFamilyName === type.body_type ? 'elevated' : 'outlined'"
                        @click="selectedFamilyName = type.body_type"
                        :color="selectedFamilyName === type.body_type ? 'black' : ''"
                        style="min-width: 20px; margin: 2px; font-size: 10px;"
                    >
                        {{ type.body_type }}
                    </v-btn>
                </div>
                <v-row justify="start" class="align-center mt-0">
                    <v-col class="d-flex flex-wrap align-center pt-0">
                        <div :class="{ 'd-block': selectedCategoryName, 'd-none': !selectedCategoryName }" class="mt-3 w-full">
                            <v-row justify="start" class="align-center w-full">
                                <v-col
                                >
                                <v-chip
                                    v-for="(categoryName, index) in types"
                                    :key="categoryName"
                                    class="m-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    @click:close="toggleValueInArray(types, categoryName)"
                                >
                                    {{ categoryName }}
                                </v-chip>
                                </v-col>
                            </v-row>
                            <v-container fluid v-if="loadingBodyShapes">
                                <div class="m-5 d-flex align-center justify-center h-32">
                                    <v-progress-circular
                                        :size="70"
                                        :width="7"
                                        color="primary"
                                        indeterminate
                                    ></v-progress-circular>
                                </div>
                            </v-container>
                            <div v-else class="flex border rounded-md w-full p-5 space-x-8">
                                <div v-for="(bodyShapes, value) in bodyShapesByCategory">
                                    <div class="font-semibold text-xl mb-3">{{ value }}</div>
                                    <div class="flex flex-col border-gray-300 border-l-[2px] pl-2">
                                        <div v-for="shape in bodyShapes" class="text-lg" @click="toggleValueInArray(types, shape)" :class="{ 'selected': types.includes(shape) }">
                                            {{shape}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </GenericFilter>
    </div>
</template>