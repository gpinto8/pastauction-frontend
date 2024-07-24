<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import Header from '../Header.vue';
import { alphabet } from '@/utils/constants/alphabet';
import { ref, watch } from 'vue';
import { type BrandInfo, getBrandAndFounderByFirstLetter } from '@/api/landingPage/landingPage';
import Footer from '../Footer.vue';

const selectedLetter = ref(alphabet[0])
const brands = ref<BrandInfo[]>()

const updateBrands = () => getBrandAndFounderByFirstLetter(selectedLetter.value)
    .then(response => brands.value = response.data.items)
    .catch(console.log)

updateBrands()

watch(selectedLetter, () => {
    updateBrands()
})

</script>

<template>
    <div class="flex flex-col relative bg-slate-500 min-h-screen">
        <Header class="w-full" />
        <div class="flex flex-col text-white px-14">
            <div class="text-5xl cormorant-custom-500 mt-24 mb-6">
                Vintage Brands Unveiled
            </div>
            <div class="text-xl w-3/4">
                Explore the rich heritage and timeless elegance of classic automotive brands in our curated collection
            </div>
            <div class="text-sm mt-10">
                To shorten your search, select the letter of your interest
            </div>
            <div class="flex mt-2 gap-1">
                <AppIcon type="filter" class="mr-2" />

                <button class="h-7 w-7 flex-center shadow-lg" v-for="letter of alphabet"
                    @click="selectedLetter = letter"
                    :class="{ 'shadow-none border !border-white': letter == selectedLetter }">
                    {{ letter }}
                </button>
            </div>
            <div class="grid grid-cols-3">
                <div v-for="brand of brands" class="bg-white h-32">{{ brand.brand_name }}</div>
            </div>
        </div>
        <Footer />
    </div>
</template>