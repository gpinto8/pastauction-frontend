<script setup lang="ts">

import InfiniteSlider from '@/components/common/InfiniteSlider.vue'

import Brand1Image from './assets/brandsIcons/brand1.png'
import Brand2Image from './assets/brandsIcons/brand2.png'
import Brand3Image from './assets/brandsIcons/brand3.png'
import Brand4Image from './assets/brandsIcons/brand4.png'
import Brand5Image from './assets/brandsIcons/brand5.png'
import Brand6Image from './assets/brandsIcons/brand6.png'
import Brand7Image from './assets/brandsIcons/brand7.png'
import Brand8Image from './assets/brandsIcons/brand8.png'

const images = [
    Brand1Image,
    Brand2Image,
    Brand3Image,
    Brand4Image,
    Brand5Image,
    Brand6Image,
    Brand7Image,
    Brand8Image,
]

</script>

<template>
    <div class="flex flex-col">
        <div class="pl-24 text-slate-400 pt-32 text-5xl w-full cormorant-custom-600">
            Vintage Brands Unveiled
        </div>

        <InfiniteSlider :bar-style="{}" class="my-32 shrink-0">
            <div class="flex space-x-10">
                <div class="h-24" v-for="image of images">
                    <img :src="image" class="h-full">
                </div>
            </div>
        </InfiniteSlider>

        <div class="flex justify-end px-32 w-full">
            <button class="text-xl px-5 py-2 border-solid text-yellow-300 border-yellow-300 border-2">
                MORE BRANDS
            </button>
        </div>

    </div>
</template>