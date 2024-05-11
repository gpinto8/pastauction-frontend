<script setup lang="ts">
import { ref } from 'vue';
import Countries from '../../components/filters/Countries.vue';

const continents: string[] = []
const selectedContinent = ref<string | null>(null)
const selectedCountries = ref<string[]>([])
const countriesOfContinent = ref<any[]>([])

</script>

<template>

    <Countries
        :continents="continents"
        v-model="selectedCountries"
        v-model:selectedContinent="selectedContinent"
        v-model:countriesOfContinent="countriesOfContinent"/>

</template>