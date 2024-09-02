<script setup lang="ts">
import { defineModel } from 'vue';

const year = defineModel<number>({ required: true })

</script>

<template>
    <div class="flex h-4 [&>img]:-mb-1 [&>img]:cursor-pointer">
        <img src="@/assets/icons/blueArrow.svg" class="" @click="year--">
        <div class="w-16 flex-center text-blue-500">{{ year }}</div>
        <img src="@/assets/icons/blueArrow.svg" class="rotate-180" @click="year++">
    </div>
</template>