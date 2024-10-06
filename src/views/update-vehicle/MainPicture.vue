<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  class: string;
}>();

const image = ref(
  'https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png'
);
</script>

<template>
  <div
    class="w-full flex flex-col gap-4 justify-center items-center"
    :class="class"
  >
    <div class="w-full flex flex-col gap-3">
      <p class="text-[#21252999] text-sm block sm:hidden">
        Select the appropriate gallery for this vehicle
      </p>
      <img
        :src="image"
        alt=""
        width="400"
        height="400"
        class="bg-red-500 rounded-md w-full"
      />
      <p class="text-[#212529] text-base">2000 Porsche Carrera 4S black</p>
    </div>
  </div>
</template>
