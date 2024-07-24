<script setup lang="ts">
import { brandLogoUrl, desaturatedBrandLogoUrl, extractBrandId, type BrandInfo } from '@/api/landingPage/landingPage';
import { computed } from 'vue';

const props = defineProps<{
    brand: BrandInfo
}>()

const brandLogo = computed(() => brandLogoUrl(extractBrandId(props.brand)))
const desaturatedBrandLogo = computed(() => desaturatedBrandLogoUrl(extractBrandId(props.brand)))

</script>

<template>
    <div class="flex flex-col justify-between bg-white group relative">

        <div
            class="flex flex-col justify-between transition-transform group-hover:-translate-y-10 pb-4 px-5 pt-7 flex-1">
            <div
                class="relative [&>*]: [&>*]:transition-[opacity,transform] [&>*]:max-h-full group-hover:[&>*]:-translate-y-[7.5rem] h-36 my-10">
                <img :src="brandLogo" class="absolute-center opacity-0 group-hover:opacity-100">
                <img :src="desaturatedBrandLogo" class="absolute-center group-hover:opacity-0">
            </div>
            <div
                class="flex flex-col text-sm [&>*]:flex first:[&>*>span]:w-16 first:[&>*>span]:block last:[&>*>span]:text-zinc-600">
                <div>
                    <span class="">Country:&nbsp;</span> <span class="">UK</span>
                </div>
                <div>
                    <span class="">Brand:&nbsp;</span> <span>{{ brand.brand_name }}</span>
                </div>
                <div>
                    <span class="">Type:&nbsp;</span> <span>{{ brand.brand_name }}</span>
                </div>
            </div>
        </div>
        <button
            class="opacity-0 absolute bottom-0 uppercase w-full text-white flex-center transition-opacity group-hover:opacity-100 h-10 bg-yellow-300">
            more details
        </button>
    </div>
</template>