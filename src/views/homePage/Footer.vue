<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';

import LogoTitle from '@/assets/icons/logoTitleBlack.svg'
import CarImage from "./assets/car.png"

const email = ref('')

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
        <div class="flex flex-col bg-slate-500 px-24 py-10 text-white">
            <div class="flex-1 flex">
                <div class="flex flex-col flex-1">
                    <AppIcon type="logoTitle" class="scale-150" />
                    <div class="my-4">Get the freshest news from us</div>
                    <div class="flex h-9 space-x-3">
                        <input type="email" v-model="email" placeholder="Your Email" class="bg-white pl-3 w-56">
                        <button class="yellow-button flex-center px-5">Subscribe</button>
                    </div>
                </div>
                <div class="w-2/5 flex">
                    <div class="w-1/2 flex flex-col">
                        <div class="font-bold text-lg mb-2">Jump To</div>
                        <div>Home</div>
                        <div>Pricing</div>
                        <div>Team</div>
                        <div>Mission</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="flex flex-col">
                            <div class="font-bold text-lg mb-2">Get in touch</div>
                            <div>info@pastauction.com</div>
                            <div>Phone number</div>
                        </div>
                        <div class="flex-1"></div>
                        <div class="flex justify-between">
                            <AppIcon type="twitterLogo" />
                            <AppIcon type="facebookLogo" />
                            <AppIcon type="youtubeLogo" />
                            <AppIcon type="instagramLogo" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white h-[1px] my-5 w-full"></div>
            <div class="flex justify-between text-slate-400 text-xs">
                <div class="flex">
                    <div v-for="string of ['Terms & Conditions', 'Privacy Policy', ' Accessibility']" class="px-4">
                        {{ string }}
                    </div>
                </div>
                <div>Design with love © 2020. All right reserved</div>
            </div>
        </div>
    </div>
</template>