<script setup lang="ts">
import type { Section } from '@/api/landingPage/landingPage';
import AppIcon from '@/components/common/AppIcon.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    images: Section[],
    backgroundImage?: string
}>()

const activeImage = ref(0)

const itemWidth = 300
const itemHeight = 200
const translateByActiveImage = computed(() => ({ transform: `translate(${-itemWidth * activeImage.value}px)` }))

</script>

<template>
    <div class="flex flex-col max-w-full justify-center overflow-hidden" :style="{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover'
    }">
        <div class="w-full text-center text-4xl text-white cormorant-custom-600">
            Titolo
        </div>
        <div class="flex mt-32" :style="{ marginLeft: `calc(50% - ${itemWidth / 2}px)` }">
            <div class="transition-[transform,z-index] duration-500 shrink-0" v-for="(image, index) of images"
                :class="activeImage == index ? 'z-10' : 'z-0'" :style="{
                    ...translateByActiveImage,
                    height: `${itemHeight}px`,
                    width: `${itemWidth}px`,
                }">
                <img :src="image.media_path!" @click="activeImage = index"
                    class="transition-[transform,opacity] duration-500 w-full h-full" :class="activeImage == index ? 'scale-[2] opacity-100' :
                        activeImage == index + 1 || activeImage == index - 1 ? 'scale-[1.5] opacity-75'
                            : 'scale-100 opacity-60'" />
            </div>
        </div>
        <div class="text-white flex-center space-x-10 w-full mt-52">
            <div class="transition-opacity duration-300" :class="activeImage == 0 ? 'opacity-0' : 'opacity-100'">
                <AppIcon type="chevron_down" class="text-gray-300 rotate-90 scale-150 "
                    @click="activeImage == 0 ? activeImage : activeImage--" />
            </div>
            <div class="flex space-x-2">
                <div v-for="(image, index) in images"
                    class="h-[10px] w-[10px] rounded-full bg-gray-300 border-[1px] border-gray-300 transition-colors"
                    :class="index == activeImage ? 'bg-sky-800' : ''"></div>
            </div>
            <div class="transition-opacity duration-300"
                :class="activeImage == images.length - 1 ? 'opacity-0' : 'opacity-100'">
                <AppIcon type="chevron_down" class="text-gray-300 -rotate-90 scale-150"
                    @click="activeImage == images.length - 1 ? activeImage : activeImage++" />
            </div>

        </div>
    </div>
</template>