<script setup lang="ts">
import { defineModel } from 'vue';
import { categories, type ChartCategory } from '../chart.ts'

const category = defineModel<ChartCategory | null>({ required: true })

</script>

<template>
    <div class="flex">
        <img src="@/assets/icons/filter.svg" alt="" srcset="">
        <div class="flex">
            <div class="text-lg ml-1">Select: </div>
            <div class="flex flex-center space-x-4 ml-5">
                <div v-for="category of categories" class="w-12 h-5 pb-1 flex-center text-xs text-white bg-[#CECECE] rounded-md">
                    {{ category }}
                </div>
            </div>
        </div>
    </div>
</template>