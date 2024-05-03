<script setup lang="ts">
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
import axios from 'axios';
import { defineModel, ref, watch } from 'vue';

const props = defineProps<{
    familiesOfTypes: any[]
}>()
const types = defineModel<string[]>({ required: true })

const selectedFamilyName = defineModel<string | null>('selectedFamily', { required: true })
const categoriesOfSelectedFamily = ref<any[]>([])

watch(selectedFamilyName, async () => {
    try {
        const response = await axios.get('/filter/filter_charts_vehicles/body_category/', {
            params: {
                search: `body_type:${selectedFamilyName.value}`
            }
        });
        categoriesOfSelectedFamily.value = response.data.items; 
        
    } catch (error) {
        console.error('Errore nel recupero dei paesi:', error);
    }
})

const selectedCategoryName = defineModel<string | null>('selectedCategory', { required: true })
const typesList = ref<any[]>([])

async function selectCategoryType(type: string, categoryType: string) {
    selectedFamilyName.value = type;
    selectedCategoryName.value = categoryType;

    try {
        const response = await axios.get('/filter/filter_charts_vehicles/body_shape/', {
                params: {
                    search: `body_type:${type},body_category:${categoryType}`
            }
        });
        typesList.value = response.data.items; 
    } catch (error) {
        console.error('Errore nel recupero dei paesi:', error);
    }
}
</script>

<template>
    <div class="flex flex-col">
        <v-row justify="start">
            <v-col class="d-flex flex-wrap align-center">
                <v-chip
                    class="custom-chip mr-3"
                    color="#0D6EFD"
                    variant="flat"
                    label
                    size="large"
                >
                    <small>Types</small>
                </v-chip>
                <v-btn
                    v-for="type in familiesOfTypes"
                    :key="type.body_type"
                    class="letter-button"
                    :variant="selectedFamilyName === type.body_type ? 'elevated' : 'outlined'"
                    @click="selectedFamilyName = type.body_type"
                    :color="selectedFamilyName === type.body_type ? 'black' : ''"
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ type.body_type }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="start" class="align-center mt-0">
            <v-col class="d-flex flex-wrap align-center pt-0">
                <div :class="{ 'd-block': selectedFamilyName, 'd-none': !selectedFamilyName }" class="mt-3" justify="start" >
                    <v-btn
                        v-for="catType in categoriesOfSelectedFamily" 
                        :key="catType.body_category"
                        class="letter-button"
                        :variant="selectedCategoryName === catType.body_category ? 'elevated' : 'outlined'"
                        @click="selectedFamilyName != null ? selectCategoryType(selectedFamilyName, catType.body_category) : ''"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ catType.body_category }}
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row justify="start" class="align-center mt-0">
            <v-col class="d-flex flex-wrap align-center pt-0">
                <div :class="{ 'd-block': selectedCategoryName, 'd-none': !selectedCategoryName }" class="mt-3">
                    <v-row justify="start" class="align-center">
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
                    <v-row class="letter-button border-brand" color="black" text>
                        <v-col 
                            v-for="categoryName in typesList" 
                            :key="categoryName.body_shape" 
                            cols="12" sm="6" md="4" lg="3">
                            <div 
                                class="m-3"
                                :class="{ 'selected': types.includes(categoryName.body_shape) }" 
                                style="font-size: 16px;" 
                                @click="toggleValueInArray(types, categoryName.body_shape)">
                                {{ categoryName.body_shape }}
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>