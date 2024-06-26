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
    <div class="flex flex-col h-[500px]">
        <div>
            Vintage Brands Unveiled
        </div>

        <InfiniteSlider paused>
            <div class="flex space-x-10">
                <div class="h-24" v-for="image of images">
                    <img :src="image" class="h-full">
                </div>
            </div>
        </InfiniteSlider>

        <!-- <div class="flex h-20 space-x-10" style="animation: scroll 10s linear infinite">
            <div class="shrink-0 h-full" v-for="image of images">
                <img :src="image" class="h-full">
            </div>
        </div> -->

        <div class="flex justify-end">
            <button class="text-xl px-5 py-2 border-solid text-yellow-300 border-yellow-300 border-2">
                MORE BRANDS
            </button>
        </div>

    </div>
</template>

<style>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>