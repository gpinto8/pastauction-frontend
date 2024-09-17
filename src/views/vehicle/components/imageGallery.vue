<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{ total: number; maxRows: number; size: number }>();

const image = ref(
  'https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png'
);

const classContainer = `grid grid-cols-[repeat(${props.maxRows},${props.size}px)] border-2 border-solid border-black`;
console.log({ classContainer });
</script>

<template>
  <div :class="classContainer">
    <img
      v-for="_ in new Array(total)"
      :src="image"
      alt=""
      :width="size"
      :height="size"
      class="block border-2 border-solid border-black"
    />
  </div>
</template>
