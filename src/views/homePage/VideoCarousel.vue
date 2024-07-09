<script setup lang="ts">
import type { Section } from '@/api/landingPage/landingPage';
import { onMounted, ref } from 'vue';
import PlayIcon from '@/assets/video/play.svg'
import PauseIcon from '@/assets/video/pause.svg'

const props = defineProps<{
    videos: Section[]
}>()

const videoElement = ref<null | HTMLVideoElement>(null)
const paused = ref(true)

onMounted(() => {
    console.log(videoElement.value);
})

</script>

<template>
    <div class="flex-center bg-red-200 relative">
        <video :src="videos[0].media_aws_path!" class="object-cover w-full h-full" ref="videoElement" loop></video>
        <!-- Overlay -->
        <div class="absolute z-10 w-full h-full">

            <div class="w-full h-full flex-center">
                <div class="w-40 h-40 p-5 rounded-full flex-center border-2 !border-white" @click="paused = !paused">
                    <img :src="paused == true ? PlayIcon : PauseIcon" class="h-full w-full" :class="{
                        'translate-x-3': paused
                    }">
                </div>
            </div>

        </div>
    </div>
</template>