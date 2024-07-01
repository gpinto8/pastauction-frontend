<script setup lang="ts">
import type { Section } from '@/api/landingPage/landingPage';
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';

const props = defineProps<{
    images: Section[],
    backgroundImage?: string
}>()

const index = ref(0)

</script>

<template>
    <div class="flex flex-col max-w-full relative">

        <img :src="backgroundImage" alt="" srcset="" class="w-full h-full absolute object-cover">

        <div class="flex-center px-10 overflow-x-scroll">
            <div class="">

            </div>
            <img v-for="image of images" :src="image.media_path!" class="h-[600px] w-[480px]">
        </div>
        <div class="flex-center space-x-5 w-full mt-14">
            <AppIcon type="chevron_down" class="text-white rotate-90 scale-150" />
            <div class="w-32 bg-green-200">
                ciao
            </div>
            <AppIcon type="chevron_down" class="text-white -rotate-90 scale-150" />
        </div>
    </div>
</template>