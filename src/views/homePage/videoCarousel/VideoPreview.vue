<script setup lang="ts">
import { Section } from '../../../api/landingPage/landingPage';
import { defineProps } from 'vue';
import PlayIcon from '@/assets/video/play.svg'

const props = defineProps<{
    video: Section
}>()

</script>

<template>
    <div class="relative flex-center">
        <div class="absolute p-2 rounded-full border-2 border-white">
            <img :src="PlayIcon" class="w-3 h-3 translate-x-[1px]" />
        </div>
        <div class="absolute w-full h-full flex flex-col p-1">
            <div class="flex-1"></div>
            <div class="text-white">
                {{ video.text_title }}
            </div>
        </div>
        <video :src="video.media_path" class="h-full w-full object-cover"></video>
    </div>
</template>