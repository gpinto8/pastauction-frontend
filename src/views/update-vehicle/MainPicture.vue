<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  class: string;
  brandName: string;
  photoPath: string;
}>();

const image = computed(
  () => `https://pastauction.com/api/v1/photo/${props.photoPath}`
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
        class="rounded-md w-full"
      />
      <p v-if="props.brandName" class="text-[#212529] text-base">
        {{ props.brandName }}
      </p>
    </div>
  </div>
</template>
