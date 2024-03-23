<script setup lang="ts">
import { storeToRefs} from 'pinia'

import {useLocateStore} from '@/store/locate/locate'

const locateStore = useLocateStore();
const {fetchBrands} = locateStore;
const {brands, brandsLoading} = storeToRefs(locateStore);

fetchBrands();
</script>

<template>
    <div class="flex flex-col gap-8 mb-96">
        {{ brandsLoading ? 'LOADING...' : 'LOADED' }}
        {{ brands }}
    </div>
</template>

<style>
.card {
    /*@apply p-10 rounded-lg bg-white;*/ /*???*/
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
}

/*SEARCHBAR COLOR*/
.my_search_bar {
    background-color: #212529
}

/*TAGS*/
.my_tag_icon_box {
    width: 70px;
    height: 60px;
}

/* Stile per il contenitore della select */
.select-container {
    position: relative;
    display: inline-block;
    width: max-content;
}

/* Stile per la select personalizzata */
.custom-select {
    padding-right: 35px !important;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}

.custom-select,
option {
    color: #000;
}

/* Stile per il componente icona */
.custom-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    /* Regola la distanza dell'icona dalla select come preferisci */
    transform: translateY(-50%);
    pointer-events: none;
}
</style>
