<script setup lang="ts">
import type { Section } from '@/api/landingPage/landingPage';
import { onMounted, ref, watch } from 'vue';
import PlayIcon from '@/assets/video/play.svg'
import PauseIcon from '@/assets/video/pause.svg'
import VideoPreview from './VideoPreview.vue'

const props = defineProps<{
    videos: Section[]
}>()

const activeVideo = ref<Section | null>(null)
const videoElement = ref<null | HTMLVideoElement>(null)
const paused = ref(true)

// Play/pause video when paused value changes 
watch(paused, () => {
    if (videoElement.value == null) return
    paused.value == true ? videoElement.value.pause() : videoElement.value.play()
})

const videoCurrentTime = ref(0)
const videoLength = ref(0)
const parsedVideoLength = ref('')
const parsedVideoCurrentTime = ref('00:00')
onMounted(() => {
    console.log(videoElement.value);

    activeVideo.value = props.videos[0]

    if (videoElement.value == null) return
    videoElement.value.addEventListener('loadedmetadata', function () {
        if (videoElement.value == null) return
        videoLength.value = videoElement.value.duration
        parsedVideoLength.value = formatTime(videoLength.value)
        console.log(videoElement.value.duration.toFixed(2));
    });

    videoElement.value.addEventListener('timeupdate', function () {
        if (videoElement.value == null) return
        videoCurrentTime.value = videoElement.value.currentTime
        parsedVideoCurrentTime.value = formatTime(videoCurrentTime.value);
    });

})

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function toPercentage(value: number, maxValue: number) {
    if (maxValue === 0) {
        throw new Error("Maximum value cannot be zero.");
    }
    return (value / maxValue) * 100;
}

const isOverlayVisible = ref(true)
const overlayVisibilityTimer = ref(0)
const OVERLAY_VISIBILITY_DURATION = 2 * 1000

function mouseMoveOnOverlay() {

    if (!isOverlayVisible.value) {
        isOverlayVisible.value = true
        return
    }

    const timeoutFunction = () => {
        isOverlayVisible.value = false

        // If the video is paused the timer should reset, so that next time I play the video the overlay will hide correctly 
        if (paused.value) {
            overlayVisibilityTimer.value = setTimeout(timeoutFunction, OVERLAY_VISIBILITY_DURATION);
        }
    }
    clearTimeout(overlayVisibilityTimer.value)
    overlayVisibilityTimer.value = setTimeout(timeoutFunction, OVERLAY_VISIBILITY_DURATION);
}

function mouseClickedOverlay() {
    if (!isOverlayVisible.value) {
        isOverlayVisible.value = true
        return
    }

    clearTimeout(overlayVisibilityTimer.value)
    overlayVisibilityTimer.value = setTimeout(() => {
        isOverlayVisible.value = false
    }, OVERLAY_VISIBILITY_DURATION);
}

</script>

<template>
    <div class="flex-center relative">
        <video :src="activeVideo ? activeVideo.media_path : ''" class="object-cover w-full h-full" ref="videoElement"
            loop></video>
        <!-- Overlay -->
        <div class="absolute z-10 w-full h-full flex flex-col transition-opacity duration-1000"
            @click="paused = !paused; mouseClickedOverlay()" @mousemove="mouseMoveOnOverlay()" :class="{
                'opacity-100': isOverlayVisible,
                'opacity-0': !isOverlayVisible && !paused,
            }">

            <div class="w-full h-full flex-center relative">
                <div class="w-40 h-40 p-5 rounded-full flex-center border-2 !border-white absolute">
                    <img :src="paused == true ? PlayIcon : PauseIcon" class="h-full w-full" :class="{
                        'translate-x-3': paused
                    }">
                </div>
            </div>

            <div class="flex-1"></div>
            <!-- Debug -->
            <!-- <div class="text-white">
                visible: {{ isOverlayVisible }} - paused: {{ paused }}
            </div> -->

            <div class="h-40 shrink-0 py-3 flex overflow-scroll space-x-10" style="background-color: rgb(0 0 0 / .6)">
                <VideoPreview v-for="video of videos" :video="video" class="w-56 h-full"
                    @click.stop="activeVideo = video" />
            </div>

            <!-- Can't use "bg-black bg-opacity-30" beacuse of stupid Vuetify bg-black that uses !important rules...  -->
            <div class="w-full h-16 px-12 flex items-center overflow-hidden" style="background-color: rgb(0 0 0 / .6)">
                <img :src="paused == true ? PlayIcon : PauseIcon" class="h-5 w-5 mr-3" @click="paused = !paused">
                <div class="text-white">{{ parsedVideoCurrentTime }}</div>
                <div class="flex-1 bg-white h-1 mx-3">
                    <div class="w-full" v-if="videoLength > 0"
                        :style="{ transform: `translateX(${toPercentage(videoCurrentTime, videoLength)}%)` }">
                        <div class="h-3 w-3 bg-white rounded-full -mt-1">

                        </div>
                    </div>
                </div>
                <div class="text-white">{{ parsedVideoLength }}</div>
            </div>

        </div>
    </div>
</template>