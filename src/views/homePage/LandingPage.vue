<script setup lang="ts">

import LandingVideo from './assets/PastAuctionLandingVideo.mp4'
import Header from './Header.vue'
import AppIcon from '@/components/common/AppIcon.vue';

import ImageSection1 from './assets/imageSection1.png'
import ImageSection2 from './assets/imageSection2.png'
import ImageSection3 from './assets/imageSection3.png'
import ImageSection4 from './assets/imageSection4.png'
import BrandsSlider from './BrandsSlider.vue';
import { groupIntoPairs } from '../../utils/functions/groupIntoPairs';
import { homepageSections, type Section } from '../../api/landingPage/landingPage';
import { computed, ref } from 'vue';
import { getHeadPageArea, getPhotoBoxes, getVideoPageArea } from '@/utils/landingPage/landingPage';

const sections = ref<Section[]>([])

const photoBoxes = computed(() => getPhotoBoxes(sections.value))
const sectionDividedByPairs = computed(() => groupIntoPairs(photoBoxes.value))

const headVideo = computed(() => getVideoPageArea(sections.value))
const headSubtitles = computed(() => getHeadPageArea(sections.value))

homepageSections()
    .then(response => {
        sections.value = response.data.items

    })

</script>

<template>
    <div class="flex flex-col">
        <full-page ref="fullpage" id="fullpage">
            <div class="section">
                <div class="flex flex-col h-screen w-full relative bg-black overflow-hidden">
                    <video :src="headVideo?.media_path || headVideo?.media_aws_path!" autoplay1 muted loop
                        class="h-full w-full object-cover absolute -z-10"></video>

                    <Header class="z-10" />

                    <div class="flex-1 flex flex-col px-24 py-10 text-white">
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

                        <div class="flex-1"></div>

                        <div
                            class="flex w-full justify-between text-4xl font-medium animate-[fadeslidefromdown_1s_ease-in-out_forwards] h-56 ">
                            <div class="flex flex-col translate-y-40" v-for="subtitle of headSubtitles">
                                {{ subtitle.text_title }}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="section relative h-full" v-for="sections of sectionDividedByPairs">
                <div class="flex flex-col w-full h-screen">
                    <div class="relative flex-1 grow w-full" v-for="section of sections">

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
            <div class="section h-screen flex justify-center items-center">
                <BrandsSlider class="w-screen h-screen" />
            </div>
        </full-page>
    </div>
</template>