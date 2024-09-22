<script setup lang="ts">

import InfiniteSlider from '@/components/common/InfiniteSlider.vue'
import { desaturatedBrandLogoUrl, extractBrandId, type BrandInfo } from '@/api/landingPage/landingPage';
// import { BRANDS_UNVEILED } from '@/router';
import BRANDS_UNVEILED from '@/api/landingPage/brands/BRANDS_UNVEILED';

const props = defineProps<{
    brands: BrandInfo[]
}>()

</script>

<template>
    <div class="flex flex-col">
        <div class="pl-24 text-slate-400 pt-32 text-5xl w-full cormorant-custom-600">
            Vintage Brands Unveiled
        </div>
        <InfiniteSlider :bar-style="{}" duration="120s" class="my-32 shrink-0">
            <div class="flex space-x-10">
                <div class="h-24 shrink-0" v-for="brand in brands">
                    <img :src="desaturatedBrandLogoUrl(extractBrandId(brand))" class="h-full w-auto">
                </div>
            </div>
        </InfiniteSlider>

        <div class="flex justify-end px-32 w-full">
            <RouterLink
              :to="{ name: BRANDS_UNVEILED }"
                class="text-xl px-5 py-2 border-solid text-yellow-300 border-yellow-300 border-2">
                MORE BRANDS
            </RouterLink>
        </div>

    </div>
</template>
