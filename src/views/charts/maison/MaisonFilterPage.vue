<script setup lang="ts">
import { ref } from 'vue';
import Maison from './filters/Maison.vue'
import AuctionCity from './filters/AuctionCity.vue';

const selectedMaisonNames = ref<string[]>([])
const selectedCityNames = ref<string[]>([])

function clearFilters() {
    
}

</script>

<template>
    <div class="flex flex-col">
        <v-alert color="info" variant="tonal">
            <v-row justify="center">
                <v-col cols="12">
                    <div class="text-center text-black">
                        <h3><strong>Auction Filter</strong></h3>
                    </div>
                </v-col>
            </v-row>
        </v-alert>
        <v-row justify="start" class="mt-2">
            <v-col>
                <small>Please, select almost 3 parameters</small>
            </v-col>
            <v-col>
                <v-btn size="x-small" class="float-right" color="black" @click="clearFilters()">Clear filters</v-btn>
            </v-col>
        </v-row>
        <div class="flex flex-col space-y-7">
            <Maison v-model="selectedMaisonNames"/>
            <AuctionCity v-model="selectedCityNames"/>
        </div>
    </div>
</template>

<style>
.custom-chip {
  @apply w-full bg-blue-500 rounded-md flex justify-center items-center text-white
}

.custom-light-chip{
    @apply bg-white text-blue-500 border border-blue-500
}

.selection {
    @apply rounded-md 
}

@media screen(sm) {
    .custom-chip{
        @apply w-32
    }
    
    .selection {
        @apply rounded-sm 
    }
}


.filters-grid-selection{
    @apply  grid gap-2 grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:flex lg:gap-0 lg:space-x-3 lg:[&>*]:flex-1
}

.selected{
    text-decoration: underline;
    color: #407BFF;
}

.border-brand{
    min-width: 20px; 
    margin: 2px; 
    border: 1px solid black; 
    font-size: 10px;
}
.category-link {
    display: block;
    position: relative;
    padding-left: 10px; /* Spazio a sinistra della linea */
}
</style>