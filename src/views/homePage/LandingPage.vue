<script setup lang="ts">

import LandingVideo from './PastAuctionLandingVideo.mp4'
import Header from './Header.vue'
import AppIcon from '@/components/common/AppIcon.vue';

</script>

<template>
    <div class="flex flex-col">

        <div class="flex flex-col h-screen w-full relative">
            <!-- Background video -->
            <video :src="LandingVideo" autoplay muted loop class="h-full w-full object-cover absolute -z-10"></video>

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
    </div>
</template>