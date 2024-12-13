<script setup lang="ts">

import AppIcon from '@/components/common/AppIcon.vue';
import Header from './Header.vue';

import { getCarouselCharts, getCarouselChartsBackgroundImage, getHeadPageArea, getPhotoBoxes, getVideoPageArea, getVideos } from '@/utils/landingPage/landingPage';
import { computed, ref } from 'vue';
import { getBrandAndFounder as getBrandAndFounders, homepageSections, type BrandInfo, type Section } from '../../api/landingPage/landingPage';
import { groupIntoPairs } from '../../utils/functions/groupIntoPairs';
import BrandsSlider from './BrandsSlider.vue';
import ChartsCarousel from './ChartsCarousel.vue';
import LastSection from './LastSection.vue';
import VideoCarousel from './videoCarousel/VideoCarousel.vue';
import SearchSection from './searchSection/SearchSection.vue';

const sections = ref<Section[]>([])

const photoBoxes = computed(() => getPhotoBoxes(sections.value))
const sectionDividedByPairs = computed(() => groupIntoPairs(photoBoxes.value))

const headVideo = computed(() => getVideoPageArea(sections.value))
const headSubtitles = computed(() => getHeadPageArea(sections.value))
const muted = ref(true)

const carouselCharts = computed(() => getCarouselCharts(sections.value))
const carouselChartsBackgroundImage = computed(() => getCarouselChartsBackgroundImage(sections.value))

const videos = computed(() => getVideos(sections.value))
homepageSections()
    .then(response => {
        sections.value = response.data.items
    })

const brands = ref<BrandInfo[]>([])
getBrandAndFounders()
    .then(response => brands.value = response.data.items)
    .catch(console.log)

</script>

<template>
    <div class="flex flex-col">
        <full-page ref="fullpage" id="fullpage">
            <div class="section">
                <div class="flex flex-col h-screen w-full relative overflow-hidden">
                    <video :src="headVideo?.media_path || headVideo?.media_aws_path!" autoplay loop :muted="muted"
                        class="h-full w-full object-cover absolute -z-10" />

                    <Header class="z-10" />

                    <div class="flex-1 flex flex-col px-24 py-10 text-white">
                        <div class="flex justify-between">
                            <div class="flex flex-col">
                                <div class="flex flex-col animate-[fadeslidefromleft_1s_ease-in-out_forwards]">
                                    <div class="text-6xl mt-32 palatino-bold max-w-[500px]">
                                        {{ headVideo?.text_title }}
                                    </div>
                                    <div class="mt-10 max-w-[500px]">
                                        {{ headVideo?.text_description }}
                                    </div>
                                </div>

                                <button class="bg-yellow-400 mt-10 w-fit px-5 py-2 flex text-white">
                                    <div>GET STARTED</div>
                                    <AppIcon class="-rotate-90 ml-3" type="chevron_down" />
                                </button>
                            </div>

                            <div class="flex justify-end items-end mr-5" @click="muted = !muted">
                                <div class="flex-center h-10">
                                    <AppIcon type="sound_off" v-if="muted" />
                                    <AppIcon type="sound_on" v-else />
                                </div>
                            </div>

                        </div>

                        <div class="flex-1"></div>

                        <div class="flex w-full justify-between text-4xl font-medium">
                            <div class="flex flex-col" v-for="subtitle of headSubtitles" v-html="subtitle.text_title">
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="section relative h-full" v-for="sections of sectionDividedByPairs">
                <div class="flex flex-col w-full h-screen">
                    <div class="relative flex-1 grow w-full first:mb-10" v-for="section of sections">

                        <img :src="section.media_path!" class="absolute h-full w-full object-cover -z-10">

                        <div class="w-full h-full px-20 py-24">

                            <div class="flex flex-col text-white h-[250px] w-[500px] pt-16 px-10 bg-zinc-950/60">
                                <div class="text-3xl"> {{ section.text_title }} </div>
                                <div class="mt-5"> {{ section.text_description }} </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="section h-screen">
                <VideoCarousel :videos="videos" class="h-screen" />
            </div>
            <div class="section h-screen">
                <SearchSection :videos="videos" class="max-h-screen h-screen w-full" v-if="videos.length > 0" />
            </div>
            <div class="section h-screen flex justify-center items-center">
                <BrandsSlider :brands="brands" class="w-screen h-screen" />
            </div>
            <div class="section h-screen flex justify-center items-center">
                <ChartsCarousel :images="carouselCharts" class="h-screen w-screen"
                    :backgroundImage="carouselChartsBackgroundImage?.media_path || ''" />
            </div>
            <div class="section h-screen">
                <div class="h-screen flex flex-col">
                    <LastSection class="h-full" />
                </div>
            </div>
        </full-page>
    </div>
</template>

<style>
.yellow-button {
    @apply border-solid text-yellow-300 border-yellow-300 border-2
}
</style>