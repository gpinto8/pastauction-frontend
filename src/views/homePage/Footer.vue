<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
import TEAM from '@/components/common/Team.vue';
import { ref } from 'vue';

const email = ref('')
</script>

<template>
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
                    <RouterLink :to="{ name: TEAM }">Team</RouterLink>
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
</template>
