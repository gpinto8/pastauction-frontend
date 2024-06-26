<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
</script>
<template>
    <div class="px-24 py-3 flex items-center justify-between bg-white/20 shadow-md">

        <AppIcon type="logoTitle" />

        <div class="flex space-x-5">

            <button class="text-xl font-bold text-white">Log In</button>

            <button
                class="text-xl px-5 py-2 border-solid text-yellow-300 border-yellow-300 border-2 ">Subscribe</button>

        </div>

    </div>
</template>