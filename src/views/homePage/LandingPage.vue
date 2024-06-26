<script setup lang="ts">

import LandingVideo from './assets/PastAuctionLandingVideo.mp4'
import Header from './Header.vue'
import AppIcon from '@/components/common/AppIcon.vue';

import ImageSection1 from './assets/imageSection1.png'
import ImageSection2 from './assets/imageSection2.png'
import ImageSection3 from './assets/imageSection3.png'
import ImageSection4 from './assets/imageSection4.png'
import BrandsSlider from './BrandsSlider.vue';

const explainSections = [
    {
        title: "Create your garage",
        description: "Your virtual garageallows you to manage the data of your vehicles oneline, including tecnical details and historical documents, making it easier to manage and share your collection",
        image: ImageSection1,
    },
    {
        title: "Data accuracy",
        description: "We carefully track and verify all data collected from both online and offline sources, ensuring that the information presented on our platform is up-to-date and reliable.",
        image: ImageSection2,
    },
    {
        title: "Data accuracy",
        description: "We carefully track and verify all data collected from both online and offline sources, ensuring that the information presented on our platform is up-to-date and reliable.",
        image: ImageSection3,

    },
    {
        title: "Data accuracy",
        description: "We carefully track and verify all data collected from both online and offline sources, ensuring that the information presented on our platform is up-to-date and reliable.",
        image: ImageSection4,

    },
]

</script>

<template>
    <div class="flex flex-col">

        <div class="flex flex-col h-screen w-full relative">
            <!-- Background video -->
            <video :src="LandingVideo" autoplay1 muted loop class="h-full w-full object-cover absolute -z-10"></video>

            <Header class="z-10" />

            <div class="flex-1 flex flex-col px-24 py-10 text-white">
                <div class="text-6xl mt-32">
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

        <div class="flex flex-col w-full space-y-16 mt-32">
            <div class="relative h-[500px] w-full" v-for="section of explainSections">

                <img :src="section.image" class="absolute h-full w-full object-cover -z-10">

                <div class="w-full h-full px-20 py-32">

                    <div class=" flex flex-col text-white h-[250px] w-[500px] pt-16 px-10 bg-zinc-950/60">
                        <div class="text-3xl"> {{ section.title }} </div>
                        <div class="mt-5"> {{ section.description }} </div>
                    </div>

                </div>

            </div>
        </div>

        <BrandsSlider class="mb-64" />

    </div>
</template>