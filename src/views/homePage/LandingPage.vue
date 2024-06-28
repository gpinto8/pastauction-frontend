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
import { getPhotoBoxes } from '@/utils/landingPage/landingPage';

const sections = ref<Section[]>([])

const photoBoxes = computed(() => {
    return getPhotoBoxes(sections.value)
})
const sectionDividedByPairs = computed(() => {
    return groupIntoPairs(photoBoxes.value)
})

homepageSections()
    .then(response => {
        sections.value = response.data.items

    })

</script>

<template>
    <div class="flex flex-col">
        <full-page ref="fullpage" id="fullpage">
            <div class="section">
                <div class="flex flex-col h-screen w-full relative">
                    <video :src="LandingVideo" autoplay1 muted loop
                        class="h-full w-full object-cover absolute -z-10"></video>

                    <Header class="z-10" />

                    <div class="flex-1 flex flex-col px-24 py-10 text-white">
                        <div class="text-6xl mt-32 palatino-bold">
                            Where classic car<br>
                            enthusiasts find<br>
                            their dream rides
                        </div>
                        <div class="mt-10">
                            We provide you with tools to connect, explore, gather information and<br>
                            engage in the world of historic automotive
                        </div>

                        <button class="bg-yellow-400 mt-10 w-fit px-5 py-2 flex text-white">
                            <div>GET STARTED</div>
                            <AppIcon class="-rotate-90 ml-3" type="chevron_down" />
                        </button>

                        <div class="flex-1"></div>

                        <div class="flex w-full justify-between text-4xl font-medium">
                            <div class="flex flex-col">
                                <div>1 milion+</div>
                                <div>vehicles</div>
                            </div>
                            <div class="flex flex-col">
                                <div>+9,000</div>
                                <div>events</div>
                            </div>
                            <div class="flex flex-col">
                                <div>$26B+</div>
                                <div>turnover</div>
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