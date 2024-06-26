<script setup lang="ts">

import LandingVideo from './PastAuctionLandingVideo.mp4'
import Header from './Header.vue'

</script>

<template>
    <div class="flex flex-col">

        <div class="h-screen w-full relative">
            <!-- Background video -->
            <video :src="LandingVideo" muted loop class="h-full w-full object-cover absolute -z-10"></video>

            <Header class="z-10" />

        </div>
    </div>
</template>