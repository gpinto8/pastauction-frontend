<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';

import LogoTitle from '@/assets/icons/logoTitleBlack.svg'
import CarImage from "./assets/car.png"
import Footer from './Footer.vue';

</script>

<template>
    <div class="flex flex-col">
        <div class="flex-1 h-full relative group">
            <div class="h-full w-full flex-center
            transition-opacity duration-700 group-hover:opacity-0">
                <img :src="LogoTitle" />
            </div>
            <div class="flex h-full absolute top-0
                transition-opacity duration-700 group-hover:opacity-100">
                <div class="flex flex-col w-1/2 h-full justify-center pl-32 
                    transition-transform duration-700 -translate-x-full group-hover:translate-x-0">
                    <div
                        class="flex flex-col transition-transform duration-700 -translate-x-full group-hover:translate-x-0">
                        <div class="cormorant-custom-700 text-5xl">Drive in with us..</div>
                        <div class="mt-5 mb-12"> Sign up now and create your garage for free </div>
                    </div>
                    <button class="yellow-button flex-center px-5 h-10 w-32">JOIN US</button>
                </div>
                <div class="w-1/2 h-full flex-center 
                    transition-transform duration-700 translate-x-full group-hover:translate-x-0">
                    <img :src="CarImage" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>