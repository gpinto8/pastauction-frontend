<script setup lang="ts">
import { carCategoryImages } from '@/api/landingPage/brandsAndFounders';
import { brandLogoUrl, desaturatedBrandLogoUrl, extractBrandId, type BrandInfo } from '@/api/landingPage/landingPage';
import { computed, ref } from 'vue';

const props = defineProps<{
    brand: BrandInfo
}>()

const brandLogo = computed(() => brandLogoUrl(extractBrandId(props.brand)))
const desaturatedBrandLogo = computed(() => desaturatedBrandLogoUrl(extractBrandId(props.brand)))
const selected = ref(false)

const hovered = ref(false)

const containerStyles = computed(() => {

    let styles = { marginTop: '3rem', marginBottom: '0rem' }

    if (hovered.value == true)
        styles = { marginTop: '-3rem', marginBottom: '4rem' }

    if (selected.value == true)
        styles = { marginTop: '0rem', marginBottom: '4rem' }

    return styles
})

</script>

<template>
    <button
        class="flex flex-col justify-between bg-white group relative duration-[500ms] [&_*]:duration-[500ms] h-[20rem]"
        @mouseleave="selected = false; hovered = false" @mouseenter="hovered = true" @click="selected = true">
        <div class="flex flex-col transition-[margin] w-full px-5 flex-1" :style="containerStyles">
            <!-- :style="hovered && !selected ? { marginTop: '-3rem', marginBottom: '4rem' } : { marginTop: '4rem', marginBottom: '0rem' }" -->
            <div class="relative [&>*]:transition-[opacity,transform] transition-[margin,height] [&>*]:max-h-full group-hover:[&>*]:-translate-y-[7.5rem]1"
                :class="selected ? 'h-10 mb-2 mt-2' : 'h-36 mb-10 mt-0'">
                <img :src="brandLogo" class="absolute-center opacity-0 group-hover:opacity-100">
                <img :src="desaturatedBrandLogo" class="absolute-center group-hover:opacity-0">
            </div>
            <div
                class="flex flex-col text-sm gap-2 [&>*]:flex first:[&>*>span]:w-[4.5rem] [&>*>span]:text-left first:[&>*>span]:block first:[&>*>span]:font-semibold [&>*>span]: last:[&>*>span]:text-zinc-600">
                <div>
                    <span class="">Brand:&nbsp;</span> <span class="line-clamp-1">{{ brand.brand_name }}</span>
                </div>
                <div>
                    <span class="">Country:&nbsp;</span> <span class="line-clamp-1">{{ brand.brand_country_code
                        }}</span>
                </div>
                <div>
                    <span class="">Type:&nbsp;</span>
                    <div class="flex-center">
                        <img :src="carCategoryImages[brand.brand_category_vehicle as keyof typeof carCategoryImages]"
                            class="w-7">
                    </div>
                </div>
                <Transition name="to-from-down">
                    <div v-if="selected">
                        <span class="">City:&nbsp;</span> <span class="line-clamp-1">{{ brand.brand_city_name
                            }}</span>
                    </div>
                </Transition>
                <Transition name="to-from-down">
                    <div v-if="selected">
                        <span class="">Active:&nbsp;</span> <span class="line-clamp-1">
                            {{ brand.brand_date_start }}</span>
                    </div>
                </Transition>
                <Transition name="to-from-down">
                    <div v-if="selected">
                        <span class="">Vechicles:&nbsp;</span> <span class="line-clamp-1">{{
                            brand.unique_vehicle_count || '-' }}</span>
                    </div>
                </Transition>
                <Transition name="to-from-down">
                    <div v-if="selected">
                        <span class="">Models:&nbsp;</span> <span class="line-clamp-1">{{ brand.unique_model_count ||
                            '-'
                            }}</span>
                    </div>
                </Transition>
                <Transition name="to-from-down">
                    <div v-if="selected">
                        <span class="">Founder:&nbsp;</span>
                        <div class="[&]:line-clamp-2 text-left">
                            <div class="line-clamp-1">{{ brand.fouder_name }}</div>
                            ({{ brand.fouder_date_born?.split('/')[2] }}-{{ brand.fouder_date_death?.split('/')[2]
                            }})
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        <button
            class="opacity-0 absolute bottom-0 uppercase w-full text-white flex-center transition-opacity group-hover:opacity-100 h-10 bg-yellow-300"
            :class="selected ? '!opacity-0' : ''">
            more details
        </button>
    </button>
</template>

<style>
.to-from-down-enter-active,
.to-from-down-leave-active {
    transition: all .5s ease;
}

.to-from-down-leave-from,
.to-from-down-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.to-from-down-enter-from,
.to-from-down-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>